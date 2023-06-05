import { Module } from '@nestjs/common';
import { USERS_REPOSITORY } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserCacheRepository } from '../repositories/users.cache.repository';
import { RedisModule } from './redis.module';
import { AuthenticateUserService } from '../../domain/services/authenticateUser.service';
import { AuthController } from '../controllers/auth.controller';
import { AUTH_REPOSITORY } from '../../domain/contracts/repositories/authRepository.contract';
import { AuthCacheRepository } from '../repositories/auth.cache.repository';

@Module({
  imports: [RedisModule],
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
  ],
})
export class AuthModule {}
