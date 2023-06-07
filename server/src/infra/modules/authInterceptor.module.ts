import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { USERS_REPOSITORY } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserCacheRepository } from '../repositories/users.cache.repository';
import { TOKEN_REPOSITORY } from '../../domain/contracts/repositories/tokenRepository.contract';
import { TokenCacheRepository } from '../repositories/token.cache.repository';

@Module({
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: UserCacheRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: TokenCacheRepository,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AuthInterceptorModule {}
