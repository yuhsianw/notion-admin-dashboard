import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';

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
  create(workspace: Workspace): Promise<Workspace> {
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
   * Updates a workspace.
   * @param workspace - The workspace object to be updated.
   * @returns A promise that resolves to the updated workspace.
   */
  update(workspace: Workspace): Promise<Workspace> {
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
