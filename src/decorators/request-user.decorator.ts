import IUserPayload from '@modules/users/interfaces/user.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return {
      user_id: request.user,
    };
  },
);

export default RequestUser;
