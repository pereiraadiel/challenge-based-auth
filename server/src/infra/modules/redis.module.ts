import { Module } from '@nestjs/common';
import { RedisProvider } from '../providers/redis.provider';

@Module({
  imports: [],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
