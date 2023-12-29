import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { UserWorkspaceService } from 'src/user-workspace/user-workspace.service';

interface MemberChangeLists {
  addedMemberIds: string[];
  removedMemberIds: string[];
}

/**
 * Service class for managing workspaces in the database.
 */
@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,

    private userWorkspaceService: UserWorkspaceService,
  ) {}

  /**
   * Returns the list of members that were added and removed.
   * @param oldMemberIds the old list of member IDs
   * @param newMemberIds the new list of member IDs
   * @returns
   */
  private getMemberChangeLists(
    oldMemberIds: string[],
    newMemberIds: string[],
  ): MemberChangeLists {
    const removedSet = new Set(oldMemberIds);
    const addedSet = new Set<string>();
    newMemberIds.forEach((id) => {
      if (removedSet.has(id)) {
        removedSet.delete(id);
      } else {
        addedSet.add(id);
      }
    });
    return {
      addedMemberIds: Array.from(addedSet),
      removedMemberIds: Array.from(removedSet),
    };
  }

  /**
   * Update workspace memberships.
   * @param workspaceId the ID of workspace to update.
   * @param newMemberIds the new list of member IDs.
   */
  private async updateMemberships(
    workspaceId: string,
    newMemberIds: string[],
  ): Promise<void> {
    const oldMemberIds = (
      await this.userWorkspaceService.findMembershipsByWorkspaceId(workspaceId)
    ).map((membership) => membership.userId);

    const changeLists = this.getMemberChangeLists(oldMemberIds, newMemberIds);
    await this.userWorkspaceService.createMembershipsWithUserIds(
      workspaceId,
      changeLists.addedMemberIds,
    );
    await this.userWorkspaceService.removeMembershipsWithUserIds(
      workspaceId,
      changeLists.removedMemberIds,
    );
  }

  /**
   * Creates a new workspace.
   * @param workspaceDto - The workspace object to be created.
   * @returns A promise that resolves to the created workspace.
   */
  async create(workspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    /**
     * Create the workspace then assign members.
     */
    const newWorkspace = await this.workspacesRepository.save(
      Object.assign(new Workspace(), workspaceDto),
    );
    if (workspaceDto.members !== undefined) {
      await this.updateMemberships(newWorkspace.id, workspaceDto.members);
    }
    return newWorkspace;
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
    if (updateWorkspaceDto.members !== undefined) {
      await this.updateMemberships(workspace.id, updateWorkspaceDto.members);
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
