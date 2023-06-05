import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from '../users.service';
import {
  USERS_REPOSITORY,
  UsersRepositoryContract,
} from '../../contracts/repositories/usersRepository.contract';
import { UserEntity } from '../../entities/user.entity';
import { AlreadyExistsException } from '../../exceptions/alreadyExists.exception';
import { NotFoundException } from '../../exceptions/notFound.exception';
import { getRandomSet } from '../../utils/set.util';
import { AuthStrategies } from '../../enums/authStrategy.enum';

const usersRepositoryMock = createMock<UsersRepositoryContract>();

const user = new UserEntity({
  username: 'teste',
  authStrategy: 'WordSet',
  authSet: getRandomSet(2, 'WordSet', []).map((item) => {
    if (typeof item === 'number') return String(item);
    if (typeof item.id === 'string') return item.id;
  }),
});

describe('User Service', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY,
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  describe('Create User', () => {
    it('should create one', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(usersRepositoryMock, 'createOne').mockResolvedValue(user);

      const response = await service.createOne(
        user.username,
        user.authStrategy,
      );

      expect(response.id).toBe(user.id);
    });

    it('should create one with mathematical strategy', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(usersRepositoryMock, 'createOne').mockResolvedValue(user);

      const response = await service.createOne(
        user.username,
        AuthStrategies.Math,
      );

      expect(response.id).toBe(user.id);
    });

    it('should returns an error if username already exists¹', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);

      await expect(
        service.createOne(user.username, user.authStrategy),
      ).rejects.toBeInstanceOf(AlreadyExistsException);
    });
  });

  describe('Get One User', () => {
    it('should get one', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);

      const response = await service.findOne(user.username);

      expect(response.id).toBe(user.id);
    });

    it('should returns an error if does not exists', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(user.username)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('Update User', () => {
    it('should update one', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);
      jest.spyOn(usersRepositoryMock, 'updateOne').mockResolvedValue(user);

      const response = await service.updateOne(
        user.username,
        user.authStrategy,
      );

      expect(response.id).toBe(user.id);
    });

    it('should update one with mathematical strategy', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(user);
      jest.spyOn(usersRepositoryMock, 'updateOne').mockResolvedValue(user);

      const response = await service.updateOne(
        user.username,
        AuthStrategies.Math,
      );

      expect(response.id).toBe(user.id);
    });

    it('should returns an error if does not exists', async () => {
      jest.spyOn(usersRepositoryMock, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateOne(user.username, user.authStrategy),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
