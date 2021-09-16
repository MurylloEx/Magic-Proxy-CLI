import { Request } from 'express';
import { Observable } from 'rxjs';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getRolesFromBits } from '../roles.enum';

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(private reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles)
      return true;

    const { user } = context.switchToHttp().getRequest();
    const userRoles = getRolesFromBits(user?.role);

    return requiredRoles.some((r_role) => userRoles.some((u_role) => r_role == u_role));
  }
}

export const AuthorizeProvider = {
  provide: APP_GUARD,
  useClass: AuthorizeGuard
}
