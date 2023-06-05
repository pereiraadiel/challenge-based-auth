import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';
import { Service } from './service';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { getRandomSet, groupAuthSet } from '../utils/set.util';
import { userSetToAuthSet } from '../mappers/users.mapper';
import { shuffleArray } from '../utils/array.utils';
import {
  AUTH_REPOSITORY,
  AuthRepositoryContract,
} from '../contracts/repositories/authRepository.contract';
import { base64encode } from '../utils/id.util';

@Injectable()
export class AuthenticateUserService extends Service {
  SERVICE_NAME = 'AUTHENTICATE_USER_SERVICE';

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,

    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepositoryContract,
  ) {
    super();
  }

  async handleSignIn(username: string, secret: string) {
    try {
      const authUsername = await this.authRepository.get(secret);
      const user = await this.usersRepository.findOne(username);

      if (!user || !authUsername || !(authUsername === username)) {
        throw new UnauthorizedException(username);
      }

      // precisa retornar o jwt
      return user;
    } catch (error) {
      this.catchException(error, username);
    }
  }

  async getSetToSignIn(username: string) {
    try {
      const user = await this.usersRepository.findOne(username);

      if (!user) {
        throw new NotFoundException(username);
      }

      const userSessionSetLength = Math.random() * user.authSet.length + 1;
      const userSessionSet = shuffleArray(user.authSet).slice(
        0,
        userSessionSetLength,
      );

      const randomSet = getRandomSet(
        12 - userSessionSetLength,
        user.authStrategy,
        userSessionSet,
      );
      const set = [
        ...userSetToAuthSet(user.authSet, user.authStrategy),
        ...randomSet,
      ];

      const items = groupAuthSet(shuffleArray(set), 3);

      // obter os ids de todos os indices do array de items onde pelo menos
      // um item corresponde a um dos elementos do set do usuário
      const itemsUserAuthSetIds = items
        .filter(({ item }) => {
          let isInUserSet = false;
          item.map((element) => {
            isInUserSet = isInUserSet || userSessionSet.includes(element.id);
          });
          return isInUserSet;
        })
        .map((item) => item.id);

      console.warn(itemsUserAuthSetIds, itemsUserAuthSetIds.join(''));

      await this.authRepository.register(
        user.username,
        base64encode(itemsUserAuthSetIds.join('')),
      );

      return {
        authStrategy: user.authStrategy,
        set: items,
      };
    } catch (error) {
      this.catchException(error, username);
    }
  }
}
