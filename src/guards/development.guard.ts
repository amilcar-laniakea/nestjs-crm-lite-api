import { Injectable, CanActivate, ForbiddenException } from '@nestjs/common';

@Injectable()
export class DevelopmentGuard implements CanActivate {
  canActivate(): boolean {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException(
        'This endpoint is only available in development'
      );
    }
    return true;
  }
}
