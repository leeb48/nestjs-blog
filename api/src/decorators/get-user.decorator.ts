import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator used to extract only the user property from REQ object
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
