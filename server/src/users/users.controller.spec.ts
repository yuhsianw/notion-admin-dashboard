import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const userServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        workspaces: [],
      };
      const createdUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        workspaces: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          workspaces: [],
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@example.com',
          workspaces: [],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const user = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        workspaces: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'changed@example.com',
      };
      const updatedUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'changed@example.com',
        workspaces: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const userId = '1';

      await controller.remove(userId);

      expect(service.remove).toHaveBeenCalledWith(userId);
    });
  });
});
