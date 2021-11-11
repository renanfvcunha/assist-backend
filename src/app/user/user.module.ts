import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '~/app/user/user.controller';

import { User } from '~/app/user/user.entity';

import { UserService } from '~/app/user/user.service';

import { PermissionModule } from '~/app/permission/permission.module';
import { ContactModule } from '~/app/contact/contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PermissionModule, ContactModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
