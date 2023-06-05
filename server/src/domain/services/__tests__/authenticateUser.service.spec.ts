import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AuthenticateUserService } from '../authenticateUser.service';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../../contracts/repositories/usersRepository.contract';
import { UserEntity } from '../../entities/user.entity';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { getRandomSet } from '../../utils/set.util';
import { NotFoundException } from '../../exceptions/notFound.exception';

const usersRepositoryMock = createMock<UsersRepositoryContract>();

const user = new UserEntity({
  username: 'teste',
  authStrategy: 'Mathematical',
  authSet: getRandomSet(2, 'Mathematical', []).map((item) => {
    if (typeof item === 'number') return String(item);
    if (typeof item.id === 'string') return item.id;
  }),
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

  describe('Get Set to Sign In', () => {
    it('should get a set to sign in', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);

      const response = await service.getSetToSignIn(user.username);

      expect(response).toBeDefined();
    });

    it('should returns an error if not found user', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(
        service.getSetToSignIn(user.username),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
