import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../../domain/services/users.service';
import { USERS_REPOSITORY } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserCacheRepository } from '../repositories/users.cache.repository';
import { TOKEN_REPOSITORY } from '../../domain/contracts/repositories/tokenRepository.contract';
import { TokenCacheRepository } from '../repositories/token.cache.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UserCacheRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: TokenCacheRepository,
    },
  ],
})
export class UsersModule {}
