import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Permission } from '~/app/permission/permission.entity';

import { PermissionDto } from '~/app/permission/dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async createPermission(data: PermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(data);

    return await this.permissionRepository.save(permission);
  }

  private async findPermission(id: number): Promise<Permission> {
    try {
      return await this.permissionRepository.findOneOrFail(id);
    } catch (err) {
      if ((err as Error).name === 'EntityNotFoundError') {
        throw new NotFoundException('Permissão não encontrada!');
      }

      throw new InternalServerErrorException();
    }
  }

  async updatePermission(id: number, data: PermissionDto): Promise<Permission> {
    const permission = await this.findPermission(id);

    permission.name = data.name;

    return await this.permissionRepository.save(permission);
  }

  async deletePermission(id: number): Promise<DeleteResult> {
    const permission = await this.findPermission(id);

    return await this.permissionRepository.delete(permission);
  }
}
