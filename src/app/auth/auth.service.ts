import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '~/app/user/user.service';

import { User } from '~/app/user/user.entity';

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

  async login(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
