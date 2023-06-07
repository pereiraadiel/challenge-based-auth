import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';
import { AuthStrategy } from '../enums/authStrategy.enum';
import { AlreadyExistsException } from '../exceptions/alreadyExists.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { Service } from './service';
import { getRandomSet } from '../utils/set.util';
import { userEntityToResponseUser } from '../mappers/users.mapper';
import { genRandomInt } from '../utils/number.util';
import {
  TOKEN_REPOSITORY,
  TokenRepositoryContract,
} from '../contracts/repositories/tokenRepository.contract';
import { genToken, validateToken } from '../utils/token.util';

@Injectable()
export class UsersService extends Service {
  SERVICE_NAME = 'USERS_SERVICE';

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,

    @Inject(TOKEN_REPOSITORY)
    private readonly tokenRepository: TokenRepositoryContract,
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
        authSet: getRandomSet(genRandomInt(3, 5), authStrategy, []).map(
          (item) => {
            if (typeof item === 'number') return String(item);
            if (typeof item.id === 'string') return item.id;
          },
        ),
      });

      const token = genToken(user);
      await this.tokenRepository.register(token);
      return token;
    } catch (error) {
      this.catchException(error, username);
    }
  }

  async findOne(token: string) {
    try {
      const { username } = await validateToken(token, this.tokenRepository);
      const user = await this.usersRepository.findOne(username);

      if (!user) {
        throw new NotFoundException(username);
      }

      return userEntityToResponseUser(user);
    } catch (error) {
      this.catchException(error, null);
    }
  }

  async updateOne(token: string, authStrategy: AuthStrategy) {
    try {
      const { username } = await validateToken(token, this.tokenRepository);
      const exists = await this.usersRepository.findOne(username);

      if (!exists) {
        throw new NotFoundException(username);
      }

      const user = await this.usersRepository.updateOne({
        username,
        authStrategy,
        authSet: getRandomSet(genRandomInt(3, 5), authStrategy, []).map(
          (item) => {
            if (!Number.isNaN(Number(item))) return item;
            if (typeof item.id === 'string') return item.id;
          },
        ),
      });

      const newToken = genToken(user);
      await this.tokenRepository.register(newToken);
      return newToken;
    } catch (error) {
      this.catchException(error, token);
    }
  }
}
