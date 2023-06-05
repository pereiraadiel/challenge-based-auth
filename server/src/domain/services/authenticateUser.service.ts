import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';
import { Service } from './service';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';

@Injectable()
export class AuthenticateUserService extends Service {
  SERVICE_NAME = 'AUTHENTICATE_USER_SERVICE';

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,
  ) {
    super();
  }

  async handleSignIn(username: string, secret: string) {
    try {
      const user = await this.usersRepository.findOne(username);

      if (!user || !user.authSet.includes(secret)) {
        throw new UnauthorizedException(username);
      }

      // precisa retornar o jwt
      return user;
    } catch (error) {
      this.catchException(error, username);
    }
  }
}
