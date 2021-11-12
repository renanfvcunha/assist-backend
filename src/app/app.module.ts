import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ormConfig } from '~/database/config';

import { AppController } from '~/app/app.controller';

import { UserModule } from '~/app/user/user.module';
import { AuthModule } from '~/app/auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [ormConfig] }),
    TypeOrmModule.forRoot(ormConfig() as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
    PermissionModule,
    ContactModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
