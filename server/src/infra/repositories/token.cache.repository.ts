import { Injectable } from '@nestjs/common';
import { RedisProvider } from '../providers/redis.provider';
import { TokenRepositoryContract } from '../../domain/contracts/repositories/tokenRepository.contract';

@Injectable()
export class TokenCacheRepository implements TokenRepositoryContract {
  constructor(private readonly database: RedisProvider) {}

  async register(token: string): Promise<void> {
    await this.database.setValue(`token:${token}`, 'true', 60 * 5); // 5 min expiração
  }

  async get(token: string): Promise<string> {
    const tokenValue = await this.database.getRawValue(`token:${token}`);

    return tokenValue;
  }
}
