import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateResult } from 'typeorm';
import { compare } from 'bcryptjs';

import { User } from '~/app/user/user.entity';
import { Permission } from '~/app/permission/permission.entity';

import { CreateUserDto } from '~/app/user/dto/createUser.dto';
import { UpdatePasswordDto } from '~/app/user/dto/updatePassword.dto';
import { UpdateUserDto } from '~/app/user/dto/updateUser.dto';

import { numberMask } from '~/helpers/masks.helper';

import { PermissionService } from '~/app/permission/permission.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly permissionService: PermissionService,
  ) {}

  async getUsers(
    page?: number,
    perPage?: number,
    search?: string,
  ): Promise<[User[], number]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.username',
        'user.cpf',
        'user.createdAt',
      ]);

    if (search) {
      queryBuilder.where('user.name like :name', { name: `%${search}%` });
      queryBuilder.orWhere('user.username like :username', {
        username: `%${search}%`,
      });
      queryBuilder.orWhere('user.cpf like :cpf', { cpf: `%${search}%` });
    }

    if (page && perPage) {
      queryBuilder.take(perPage);
      queryBuilder.skip(page * perPage);
    }

    queryBuilder.orderBy('user.createdAt', 'DESC');

    return await queryBuilder.getManyAndCount();
  }

  async createUser(data: CreateUserDto): Promise<User> {
    /** Verificando se já existe usuário com o mesmo nome de usuário e cpf */
    if (data.username) {
      const usernameExists = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (usernameExists)
        throw new UnprocessableEntityException(
          'Já existe um usuário com o nome de usuário informado.',
        );
    }

    if (data.cpf) {
      const cpfExists = await this.userRepository.findOne({
        where: { cpf: numberMask(data.cpf) },
      });

      if (cpfExists)
        throw new UnprocessableEntityException(
          'Já existe um usuário com o cpf informado.',
        );
    }

    /** Criando Usuário */
    const user = new User();
    user.name = data.name;
    user.username = data.username;
    user.cpf = numberMask(data.cpf);
    user.password = data.password;

    const permissions = await this.permissionService.getPermissions();

    const permissionsToSet: Permission[] = [];

    data.permissions &&
      data.permissions.length > 0 &&
      data.permissions.forEach((id) => {
        permissions.forEach((permission) => {
          if (permission.id === id) {
            permissionsToSet.push(permission);
          }
        });
      });

    user.permissions = permissionsToSet;

    return await this.userRepository.save(user);
  }

  async findUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    if (!user) throw new NotFoundException('Usuário Não Encontrado!');

    return user;
  }

  async updatePassword(userId: string, data: UpdatePasswordDto): Promise<User> {
    const userToUpdate = await this.findUser(userId);

    const userPass = await this.userRepository.findOne(userToUpdate.id, {
      select: ['password'],
    });

    const match =
      userPass && (await compare(data.oldPassword, userPass.password));

    if (!match) throw new BadRequestException('A senha atual está incorreta!');

    userToUpdate.password = data.password;

    return await this.userRepository.save(userToUpdate);
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findUser(id);

    /** Verificando se já existe usuário com o mesmo nome de usuário e cpf */
    if (data.username) {
      const usernameExists = await this.userRepository.findOne({
        where: { username: data.username, id: Not(id) },
      });

      if (usernameExists)
        throw new UnprocessableEntityException(
          'Já existe um usuário com o nome de usuário informado.',
        );
    }

    if (data.cpf) {
      const cpfExists = await this.userRepository.findOne({
        where: { cpf: numberMask(data.cpf), id: Not(id) },
      });

      if (cpfExists)
        throw new UnprocessableEntityException(
          'Já existe um usuário com o cpf informado.',
        );
    }

    /** Atualizando usuário */
    if (data.name) userToUpdate.name = data.name;
    if (data.username) userToUpdate.username = data.username;
    if (data.cpf) userToUpdate.cpf = numberMask(data.cpf);
    if (data.password) userToUpdate.password = data.password;

    const permissions = await this.permissionService.getPermissions();

    const permissionsToSet: Permission[] = [];

    data.permissions &&
      data.permissions.length > 0 &&
      data.permissions.forEach((id) => {
        permissions.forEach((permission) => {
          if (permission.id === id) {
            permissionsToSet.push(permission);
          }
        });
      });

    userToUpdate.permissions = permissionsToSet;

    return await this.userRepository.save(userToUpdate);
  }

  async deleteUser(userId: string, id: string): Promise<UpdateResult> {
    const checkOwn = await this.findUser(userId);

    if (checkOwn.id === id) {
      throw new UnprocessableEntityException(
        'Não é possível remover seu próprio usuário!',
      );
    }

    return await this.userRepository.softDelete(id);
  }

  async findByName(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
