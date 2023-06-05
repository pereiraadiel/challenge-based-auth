import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';
import { AuthStrategy } from '../enums/authStrategy.enum';
import { getRandomSetOfWords } from '../utils/words/word.util';
import { AlreadyExistsException } from '../exceptions/alreadyExists.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { Service } from './service';

@Injectable()
export class UsersService extends Service {
  SERVICE_NAME = 'USERS_SERVICE';

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,
  ) {
    super();
  }

  async createOne(username: string, authStrategy: AuthStrategy) {
    try {
      const alreadyExists = await this.usersRepository.findOne(username);

      if (alreadyExists) {
        throw new AlreadyExistsException(username);
      }

      const user = await this.usersRepository.createOne({
        username,
        authStrategy,
        authSet: getRandomSetOfWords(5).map(({ id }) => id),
      });

      // precisa retornar o jwt
      return user;
    } catch (error) {
      this.catchException(error, username);
    }
  }

  async findOne(username: string) {
    try {
      const user = await this.usersRepository.findOne(username);

      if (!user) {
        throw new NotFoundException(username);
      }

      return user;
    } catch (error) {
      this.catchException(error, username);
    }
  }

  async updateOne(username: string, authStrategy: AuthStrategy) {
    try {
      const exists = await this.usersRepository.findOne(username);

      if (!exists) {
        throw new NotFoundException(username);
      }

      return await this.usersRepository.updateOne({
        username,
        authStrategy,
        authSet: getRandomSetOfWords(5).map(({ id }) => id),
      });
    } catch (error) {
      this.catchException(error, username);
    }
  }
}
