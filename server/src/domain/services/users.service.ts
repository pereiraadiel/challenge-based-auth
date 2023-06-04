import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';
import { AuthStrategy } from '../enums/authStrategy.enum';
import { getRandomSetOfWords } from '../utils/words/word.util';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,
  ) {}

  async createOne(username: string, authStrategy: AuthStrategy) {
    try {
      const alreadyExists = await this.usersRepository.findOne(username);

      if (alreadyExists) {
        throw new Error('409');
      }

      const user = await this.usersRepository.createOne({
        username,
        authStrategy,
        authSet: getRandomSetOfWords(5).map(({ id }) => id),
      });

      // precisa retornar o jwt
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(username: string) {
    try {
      const user = await this.usersRepository.findOne(username);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(username: string, authStrategy: AuthStrategy) {
    try {
      const exists = await this.usersRepository.findOne(username);

      if (!exists) {
        throw new Error('404');
      }

      return await this.usersRepository.updateOne({
        username,
        authStrategy,
        authSet: getRandomSetOfWords(5).map(({ id }) => id),
      });
    } catch (error) {
      throw error;
    }
  }
}
