import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      /**
       * Setup custom providers for the test module.
       */
      providers: [
        UsersService,
        /**
         * Mock the users repository, which is represented by a token.
         */
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnd@com',
        workspaces: [],
      };
      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const result = await service.create(user);

      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users: User[] = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'johnd@com',
          workspaces: [],
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'janes@com',
          workspaces: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(users);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const user: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnd@com',
        workspaces: [],
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 1;
      const user: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnd@com',
        workspaces: [],
      };
      const updatedUser: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'udpated@com',
        workspaces: [],
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);

      const result = await service.update(userId, user);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
