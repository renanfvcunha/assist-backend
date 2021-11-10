import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~/app/user/user.service';

import { User } from '~/app/user/user.entity';
import { jwtConstants } from '~/config/jwtConstants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByName(username);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) return user;
    }

    return null;
  }

  async login(user: User, remember: boolean) {
    let payload = { sub: user.id, refresh_token: '', remember };

    const refresh = await this.jwtService.signAsync(
      { sub: user.id },
      {
        expiresIn: remember ? '30d' : jwtConstants().refreshExpires,
        secret: jwtConstants().refreshSecret,
      },
    );

    payload = { ...payload, refresh_token: refresh };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(token: string) {
    const decoded = this.jwtService.decode(token) as {
      sub: string;
      refresh_token: string;
      remember: boolean;
    };

    if (!decoded) {
      throw new BadRequestException('Token Inválido!');
    }

    try {
      await this.jwtService.verifyAsync(decoded.refresh_token, {
        secret: jwtConstants().refreshSecret,
      });

      if (decoded.remember) {
        const payload = {
          sub: decoded.sub,
          refresh_token: decoded.refresh_token,
          remember: true,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        let payload = {
          sub: decoded.sub,
          refresh_token: '',
          remember: false,
        };

        const refresh = await this.jwtService.signAsync(
          { sub: decoded.sub },
          {
            expiresIn: jwtConstants().refreshExpires,
            secret: jwtConstants().refreshSecret,
          },
        );

        payload = { ...payload, refresh_token: refresh };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (err) {
      console.error(err);
      if (
        ['jwt expired', 'invalid signature'].find(
          (message) => message === (err as Error).message,
        )
      ) {
        throw new UnprocessableEntityException(
          'Token inválido ou expirado! Faça login novamente.',
        );
      }

      throw new InternalServerErrorException();
    }
  }
}
