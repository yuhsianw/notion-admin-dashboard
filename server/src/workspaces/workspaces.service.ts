import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { UserWorkspaceService } from 'src/user-workspace/user-workspace.service';
import { GetWorkspaceDto } from './dto/get-workspace.dto';

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
   * Get the list of members that were added and removed.
   * @param oldMemberIds - The old list of member IDs.
   * @param newMemberIds - The new list of member IDs.
   * @returns An object containing the added and removed member IDs.
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
   * Get the list of members in a workspace.
   * @param workspaceId - The ID of the workspace.
   * @returns A promise that resolves to the list of member IDs.
   */
  private async getWorkspaceMembers(workspaceId: string): Promise<string[]> {
    return (
      await this.userWorkspaceService.findMembershipsByWorkspaceId(workspaceId)
    ).map((membership) => membership.userId);
  }

  /**
   * Create a GetWorkspaceDto from a Workspace object.
   * @param workspace - The workspace object.
   * @returns A promise that resolves to the GetWorkspaceDto.
   */
  private async createGetWorkspaceDto(
    workspace: Workspace,
  ): Promise<GetWorkspaceDto> {
    const workspaceDto: GetWorkspaceDto = {
      id: workspace.id,
      name: workspace.name,
      domain: workspace.domain,
      samlEnabled: workspace.samlEnabled,
      members: await this.getWorkspaceMembers(workspace.id),
    };
    return workspaceDto;
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
    const oldMemberIds = await this.getWorkspaceMembers(workspaceId);

    const changeLists = this.getMemberChangeLists(oldMemberIds, newMemberIds);
    await this.userWorkspaceService.createMemberships(
      [workspaceId],
      changeLists.addedMemberIds,
    );
    await this.userWorkspaceService.removeMemberships(
      [workspaceId],
      changeLists.removedMemberIds,
    );
  }

  /**
   * Creates a new workspace.
   * @param workspaceDto - The workspace object to be created.
   * @returns A promise that resolves to the created workspace.
   */
  async create(workspaceDto: CreateWorkspaceDto): Promise<GetWorkspaceDto> {
    /**
     * Create the workspace then assign members.
     */
    const newWorkspace = await this.workspacesRepository.save(
      Object.assign(new Workspace(), workspaceDto),
    );
    if (workspaceDto.members !== undefined) {
      await this.updateMemberships(newWorkspace.id, workspaceDto.members);
    }
    return this.createGetWorkspaceDto(newWorkspace);
  }

  /**
   * Retrieves all workspaces.
   * @returns A promise that resolves to an array of workspaces.
   */
  async findAll(): Promise<GetWorkspaceDto[]> {
    const workspaces = await this.workspacesRepository.find({
      order: { createdDate: 'DESC' },
    });
    return Promise.all(
      workspaces.map((workspace) => this.createGetWorkspaceDto(workspace)),
    );
  }

  /**
   * Retrieves a workspace by its ID.
   * @param id - The ID of the workspace to retrieve.
   * @returns A promise that resolves to the retrieved workspace, or null if not found.
   */
  async findOne(id: string): Promise<GetWorkspaceDto | null> {
    const workspace = await this.workspacesRepository.findOneBy({ id });
    return workspace ? this.createGetWorkspaceDto(workspace) : null;
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
  ): Promise<GetWorkspaceDto> {
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

    const updatedWorkspace = await this.workspacesRepository.save(workspace);
    return this.createGetWorkspaceDto(updatedWorkspace);
  }

  /**
   * Removes a workspace by its ID.
   * @param id - The ID of the workspace to remove.
   * @returns A promise that resolves when the workspace is successfully removed.
   */
  async remove(id: string): Promise<void> {
    await this.updateMemberships(id, []);
    await this.workspacesRepository.delete(id);
  }
}
