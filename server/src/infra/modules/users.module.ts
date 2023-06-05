import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../../domain/services/users.service';
import { USERS_REPOSITORY } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserCacheRepository } from '../repositories/users.cache.repository';
import { RedisModule } from './redis.module';

@Module({
  imports: [RedisModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UserCacheRepository,
    },
  ],
})
export class UsersModule {}
