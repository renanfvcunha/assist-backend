import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PermissionService } from '~/app/permission/permission.service';

import { Permission } from '~/app/permission/permission.entity';

import { PermissionDto } from '~/app/permission/dto/permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async index(): Promise<Permission[]> {
    return await this.permissionService.getPermissions();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async store(@Body() data: PermissionDto): Promise<Permission> {
    return await this.permissionService.createPermission(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() data: PermissionDto) {
    return await this.permissionService.updatePermission(parseInt(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.permissionService.deletePermission(parseInt(id));
  }
}
