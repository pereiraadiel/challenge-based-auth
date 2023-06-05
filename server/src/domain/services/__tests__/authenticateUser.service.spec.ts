import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AuthenticateUserService } from '../authenticateUser.service';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../../contracts/repositories/usersRepository.contract';
import { UserEntity } from '../../entities/user.entity';
import { getRandomSetOfWords } from '../../utils/words/word.util';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

const usersRepositoryMock = createMock<UsersRepositoryContract>();

const user = new UserEntity({
  username: 'teste',
  authStrategy: 'WordSet',
  authSet: getRandomSetOfWords(2).map(({ id }) => id),
});

describe('Authenticate User Service', () => {
  let service: AuthenticateUserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUserService,
        {
          provide: USERS_REPOSITORY,
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(AuthenticateUserService);
  });

  describe('Authenticate User', () => {
    it('should authenticate one user', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);

      const result = await service.handleSignIn(user.username, user.authSet[0]);

      expect(result).toBeDefined();
    });

    it('should returns an error if not found user', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(
        service.handleSignIn(user.username, user.authSet[0]),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should returns an error if secret was wrong', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);

      await expect(
        service.handleSignIn(user.username, user.id),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
