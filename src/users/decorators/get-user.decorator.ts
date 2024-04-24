import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

export interface UserOnJWT {
  uid: string;
  role: Role;
  username: string;
  groupId: number;
}

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as UserOnJWT;
  },
);
