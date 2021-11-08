import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ormConfig } from 'src/database/config';

import { AppController } from '~/app/app.controller';
import { UserModule } from '~/app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [ormConfig] }),
    TypeOrmModule.forRoot(ormConfig() as TypeOrmModuleOptions),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
