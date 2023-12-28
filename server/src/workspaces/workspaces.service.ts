import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

/**
 * Service class for managing workspaces in the database.
 */
@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
  ) {}

  /**
   * Creates a new workspace.
   * @param workspace - The workspace object to be created.
   * @returns A promise that resolves to the created workspace.
   */
  create(workspace: CreateWorkspaceDto): Promise<Workspace> {
    return this.workspacesRepository.save(workspace);
  }

  /**
   * Retrieves all workspaces.
   * @returns A promise that resolves to an array of workspaces.
   */
  findAll(): Promise<Workspace[]> {
    return this.workspacesRepository.find();
  }

  /**
   * Retrieves a workspace by its ID.
   * @param id - The ID of the workspace to retrieve.
   * @returns A promise that resolves to the retrieved workspace, or null if not found.
   */
  findOne(id: string): Promise<Workspace | null> {
    return this.workspacesRepository.findOneBy({ id });
  }

  /**
   * Updates a workspace by its ID.
   * @param id - The ID of the workspace to update.
   * @param updateWorkspaceDto - Object containing fields to update.
   * @returns A promise that resolves to the updated workspace.
   * @throws NotFoundException if the workspace is not found.
   */
  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    const workspace = await this.findOne(id);
    if (!workspace) throw new NotFoundException('Workspace not found');

    if (updateWorkspaceDto.name !== undefined) {
      workspace.name = updateWorkspaceDto.name;
    }
    if (updateWorkspaceDto.domain !== undefined) {
      workspace.domain = updateWorkspaceDto.domain;
    }
    if (updateWorkspaceDto.samlEnabled !== undefined) {
      workspace.samlEnabled = updateWorkspaceDto.samlEnabled;
    }

    return this.workspacesRepository.save(workspace);
  }

  /**
   * Removes a workspace by its ID.
   * @param id - The ID of the workspace to remove.
   * @returns A promise that resolves when the workspace is successfully removed.
   */
  async remove(id: string): Promise<void> {
    await this.workspacesRepository.delete(id);
  }
}
