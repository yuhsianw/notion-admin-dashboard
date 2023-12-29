import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UserWorkspaceModule } from '../user-workspace/user-workspace.module';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let repository: Repository<Workspace>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserWorkspaceModule],
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
      const workspaceDto: CreateWorkspaceDto = {
        name: 'Test Workspace',
        domain: 'test',
        samlEnabled: false,
        members: [],
      };
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        domain: 'test',
        memberships: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'save').mockResolvedValue(workspace);

      const result = await service.create(workspaceDto);

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
          memberships: [],
          samlEnabled: false,
        },
        {
          id: '2',
          name: 'Workspace 2',
          domain: 'workspace2',
          memberships: [],
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
        memberships: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(workspace);

      const result = await service.findOne('1');

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(workspace);
    });

    it('should return null if workspace is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      const result = await service.findOne('1');

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a workspace', async () => {
      const workspaceDto: UpdateWorkspaceDto = {
        name: 'Test Workspace',
        domain: 'test',
        samlEnabled: false,
        members: [],
      };
      const workspace: Workspace = {
        id: '1',
        name: 'Test Workspace',
        domain: 'test',
        memberships: [],
        samlEnabled: false,
      };
      jest.spyOn(repository, 'save').mockResolvedValue(workspace);

      const result = await service.update('1', workspaceDto);

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
