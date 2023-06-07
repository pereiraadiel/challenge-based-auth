import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UnauthorizedException } from '../../domain/exceptions/unauthorized.exception';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get<any>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return next.handle();
    }

    const headerAuthorization = request.headers['authorization'];

    if (headerAuthorization) {
      const [, token] = headerAuthorization.split('Bearer ');
      if (token) {
        request.token = token;
        return next.handle();
      }
    }
    throw new UnauthorizedException(null);
  }
}
