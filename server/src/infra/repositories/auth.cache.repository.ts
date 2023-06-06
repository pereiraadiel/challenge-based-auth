import { Injectable } from '@nestjs/common';
import { RedisProvider } from '../providers/redis.provider';
import { AuthRepositoryContract } from '../../domain/contracts/repositories/authRepository.contract';

@Injectable()
export class AuthCacheRepository implements AuthRepositoryContract {
  constructor(private readonly database: RedisProvider) {}

  async register(username: string, oneTimeId: string): Promise<void> {
    await this.database.setValue(`auth:${username}`, oneTimeId, 60 * 5); // 1 min expiração
  }

  async get(username: string, oneTimeId: string): Promise<string> {
    const authValue = await this.database.getRawValue(`auth:${username}`);
    await this.database.deleteValue(`auth:${username}`);

    if (authValue !== oneTimeId) return null;

    return authValue;
  }
}
