import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { RedisModule } from './redis.module';

@Module({
  imports: [UsersModule, AuthModule, RedisModule],
})
export class AppModule {}
