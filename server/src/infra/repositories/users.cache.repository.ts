import { Injectable } from '@nestjs/common';
import { CreateOneUserDAO } from '../../domain/contracts/repositories/daos/createOneUser.dao';
import { UpdateOneUserDAO } from '../../domain/contracts/repositories/daos/updateOneUser.dao';
import { UsersRepositoryContract } from '../../domain/contracts/repositories/usersRepository.contract';
import { UserEntity } from '../../domain/entities/user.entity';
import { RedisProvider } from '../providers/redis.provider';

@Injectable()
export class UserCacheRepository implements UsersRepositoryContract {
  constructor(private readonly database: RedisProvider) {}

  async createOne(dao: CreateOneUserDAO): Promise<UserEntity> {
    return (await this.database.setValue(
      `user:${dao.username}`,
      JSON.stringify({
        ...dao,
        createdAt: new Date(),
      }),
      60 * 30, // 30 min
    )) as any;
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.database.getParsedValue(`user:${username}`);
  }

  async updateOne(dao: UpdateOneUserDAO): Promise<UserEntity> {
    const userStored = await this.database.getParsedValue(
      `user:${dao.username}`,
    );

    if (!userStored) return null;

    return (await this.database.setValue(
      `user:${dao.username}`,
      JSON.stringify({
        ...userStored,
        ...dao,
        updatedAt: new Date(),
      }),
    )) as any;
  }
}
