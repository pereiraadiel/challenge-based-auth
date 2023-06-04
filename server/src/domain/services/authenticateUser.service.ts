import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../contracts/repositories/usersRepository.contract';

@Injectable()
export class AuthenticateUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepositoryContract,
  ) {}

  async handleSignIn(username: string, secret: string) {
    try {
      const user = await this.usersRepository.findOne(username);

      if (!user || !user.authSet.includes(secret)) {
        throw new Error('401');
      }

      // precisa retornar o jwt
      return user;
    } catch (error) {
      throw error;
    }
  }
}
