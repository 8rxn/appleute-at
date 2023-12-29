import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('\n\n\n\n\nRequired roles ;', requiredRoles, '\n\n\n\n\n');
    if (!requiredRoles) {
      return true;
    }

    const {user} = context.switchToHttp().getRequest();
    console.log('\n\n\n\n\nUser ;', user, '\n\n\n\n\n');
    // const user = { role: 'user ' };

    return requiredRoles.some((role) => user.role === role);
  }
}
