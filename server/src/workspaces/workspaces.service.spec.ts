import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let repository: Repository<Workspace>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        { provide: getRepositoryToken(Workspace), useClass: Repository },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
    repository = module.get<Repository<Workspace>>(
      getRepositoryToken(Workspace),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new workspace', async () => {
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        domain: 'test',
        members: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'save').mockResolvedValue(workspace);

      const result = await service.create(workspace);

      expect(repository.save).toHaveBeenCalledWith(workspace);
      expect(result).toEqual(workspace);
    });
  });

  describe('findAll', () => {
    it('should retrieve all workspaces', async () => {
      const workspaces: Workspace[] = [
        {
          id: '1',
          name: 'Workspace 1',
          domain: 'workspace1',
          members: [],
          samlEnabled: false,
        },
        {
          id: '2',
          name: 'Workspace 2',
          domain: 'workspace2',
          members: [],
          samlEnabled: true,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(workspaces);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(workspaces);
    });
  });

  describe('findOne', () => {
    it('should retrieve a workspace by its ID', async () => {
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        domain: 'test',
        members: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(workspace);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(workspace);
    });

    it('should return null if workspace is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a workspace', async () => {
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        domain: 'test',
        members: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'save').mockResolvedValue(workspace);

      const result = await service.update(workspace);

      expect(repository.save).toHaveBeenCalledWith(workspace);
      expect(result).toEqual(workspace);
    });
  });

  describe('remove', () => {
    it('should remove a workspace by its ID', async () => {
      const id = '1';
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
