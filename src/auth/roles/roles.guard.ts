import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(role: string) {
    this.role = role;
  }

  private role: string;

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (this.role === 'admin') {
      return getAuth()
        .verifyIdToken(token)
        .then((claims) => {
          if (claims.admin === true) {
            return true;
          }
        });
    }
  }
}
