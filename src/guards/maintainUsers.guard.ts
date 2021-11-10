import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '~/app/user/user.service';

@Injectable()
export class MaintainUsersGuard extends AuthGuard('jwt') {
  constructor(private readonly userService: UserService) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    return super.canActivate(ctx);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const userPermissions = await this.userService.getPermissions(user.id);

    if (
      !userPermissions.find(
        (permission) => permission.name === 'Manter Usuários e Permissões',
      )
    )
      throw new ForbiddenException();

    return user;
  }
}
