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
import { genRandomInt } from '../utils/number.util';

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
      const authUsername = await this.authRepository.get(username, secret);
      const user = await this.usersRepository.findOne(username);

      if (!user || !authUsername) {
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

      const userSessionSetLength = genRandomInt(2, user.authSet.length);
      const userSessionSet = shuffleArray(user.authSet).slice(
        0,
        userSessionSetLength,
      );

      const randomSet = getRandomSet(
        18 - userSessionSetLength,
        user.authStrategy,
        user.authSet,
      );

      const set = [
        ...userSetToAuthSet(userSessionSet, user.authStrategy),
        ...randomSet,
      ];

      const setGroup = groupAuthSet(shuffleArray(set), 3);

      // obter os ids de todos os indices do array de setGroup onde pelo menos
      // um item corresponde a um dos elementos do set de auth do usuário
      const setGroupUserAuthSetIds = setGroup
        .filter(({ item }) => {
          let isInUserSet = false;
          item.map((element) => {
            !Number.isNaN(Number(element))
              ? (isInUserSet = isInUserSet || userSessionSet.includes(element))
              : (isInUserSet =
                  isInUserSet || userSessionSet.includes(element.id));
          });
          return isInUserSet;
        })
        .map((item) => item.id);

      // gerar a senha do usuário com base nos ids dos sets que
      // contenham pelo menos um dos elementos do set de auth do usuário
      const password = base64encode(setGroupUserAuthSetIds.join(''));

      await this.authRepository.register(user.username, password);

      return {
        authStrategy: user.authStrategy,
        set: setGroup,
      };
    } catch (error) {
      this.catchException(error, username);
    }
  }
}
