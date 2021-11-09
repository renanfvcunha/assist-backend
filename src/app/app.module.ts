import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ormConfig } from '~/database/config';

import { AppController } from '~/app/app.controller';

import { UserModule } from '~/app/user/user.module';
import { AuthModule } from '~/app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [ormConfig] }),
    TypeOrmModule.forRoot(ormConfig() as TypeOrmModuleOptions),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
