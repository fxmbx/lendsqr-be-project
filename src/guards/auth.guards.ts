import { AuthService } from '../modules/users/services/auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    const fields: string[] = header.split(' ');
    const token: string = fields[1];

    if (!token) {
      return false;
    }

    const userId = this.authService.validateToken(token);
    if (!userId) {
      return false;
    }

    request.user = userId;

    return true;
  }
}
