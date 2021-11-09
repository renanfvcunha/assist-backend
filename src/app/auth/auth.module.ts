import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '~/app/user/user.module';

import { AuthService } from '~/app/auth/auth.service';

import { LocalStrategy } from '~/app/auth/strategy/local.strategy';
import { JwtStrategy } from '~/app/auth/strategy/jwt.strategy';

import { AuthController } from '~/app/auth/auth.controller';

import { jwtConstants } from '~/config/jwtConstants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({ load: [jwtConstants] }),
    JwtModule.register({
      secret: jwtConstants().secret,
      signOptions: {
        expiresIn: jwtConstants().expires,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
