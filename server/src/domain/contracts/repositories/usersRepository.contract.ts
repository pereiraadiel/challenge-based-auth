import { UserEntity } from '../../entities/user.entity';
import { CreateOneUserDAO } from './daos/createOneUser.dao';
import { UpdateOneUserDAO } from './daos/updateOneUser.dao';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface UsersRepositoryContract {
  createOne(dao: CreateOneUserDAO): Promise<UserEntity>;
  findOne(username: string): Promise<UserEntity>;
  updateOne(dao: UpdateOneUserDAO): Promise<UserEntity>;
}
