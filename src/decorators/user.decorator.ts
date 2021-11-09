import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!req.userId) {
    return null;
  }

  return req.userId;
});
