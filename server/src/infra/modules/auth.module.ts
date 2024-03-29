import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserCacheRepository } from '../repositories/users.cache.repository';
import { AuthenticateUserService } from '../../domain/services/authenticateUser.service';
import { AuthController } from '../controllers/auth.controller';
import { TOKEN_REPOSITORY } from '../../domain/contracts/repositories/tokenRepository.contract';
import { TokenCacheRepository } from '../repositories/token.cache.repository';
import { AUTH_REPOSITORY } from '../../domain/contracts/repositories/authRepository.contract';
import { AuthCacheRepository } from '../repositories/auth.cache.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthenticateUserService,
    {
      provide: USERS_REPOSITORY,
      useClass: UserCacheRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthCacheRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: TokenCacheRepository,
    },
  ],
})
export class AuthModule {}
