import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '~/app/user/user.service';

import { User } from '~/app/user/user.entity';

import { CreateUserDto } from '~/app/user/dto/createUser.dto';
import { UpdatePasswordDto } from '~/app/user/dto/updatePassword.dto';
import { UpdateUserDto } from '~/app/user/dto/updateUser.dto';

import { User as UserDec } from '~/decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
  ): Promise<[User[], number]> {
    return await this.userService.getUsers(
      parseInt(page),
      parseInt(perPage),
      search,
    );
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.createUser(data);
  }

  @Get(':id')
  async show(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          throw new BadRequestException('ID não está no formato de UUID');
        },
      }),
    )
    id: string,
  ) {
    return await this.userService.findUser(id);
  }

  @Patch('me/password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @UserDec() userId: string,
    @Body() data: UpdatePasswordDto,
  ): Promise<User> {
    return await this.userService.updatePassword(userId, data);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          throw new BadRequestException('ID não está no formato de UUID');
        },
      }),
    )
    id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async destroy(
    @UserDec() userId: string,
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () => {
          throw new BadRequestException('ID não está no formato de UUID');
        },
      }),
    )
    id: string,
  ): Promise<void> {
    await this.userService.deleteUser(userId, id);
  }
}
