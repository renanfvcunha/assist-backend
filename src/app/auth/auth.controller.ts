import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '~/app/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req: any, remember: boolean) {
    return await this.authService.login(req.user, remember);
  }

  @Get('refresh')
  async refresh(@Headers('Authorization') auth: string) {
    if (!auth) {
      throw new BadRequestException('Token Não Enviado!');
    }

    const token = auth.split(' ')[1];

    return await this.authService.refreshToken(token);
  }
}
