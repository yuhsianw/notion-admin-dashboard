import { Injectable } from '@nestjs/common';
import { UserWorkspace } from './user-workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWorkspaceDto } from './dto/create-user-workspace.dto';

/**
 * Service responsible for managing memberships (user-workspace relation).
 */
@Injectable()
export class UserWorkspaceService {
  constructor(
    @InjectRepository(UserWorkspace)
    private userWorkspaceRepository: Repository<UserWorkspace>,
  ) {}

  /**
   * Creates a new membership - adds a user to a workspace.
   * @param createUserWorkspaceDto - The data for creating the membership.
   * @returns The created membership.
   */
  create(createUserWorkspaceDto: CreateUserWorkspaceDto) {
    return this.userWorkspaceRepository.save(createUserWorkspaceDto);
  }

  /**
   * Removes a memberships - removes a user from a workspace.
   * @param workspaceId - The ID of the workspace.
   * @param userId - The ID of the user.
   * @returns A promise that resolves when the user is removed.
   */
  remove(workspaceId: string, userId: string) {
    return this.userWorkspaceRepository.delete({
      workspace: { id: workspaceId },
      user: { id: userId },
    });
  }

  /**
   * Finds all memberships by workspace ID.
   * @param workspaceId - The ID of the workspace.
   * @returns A promise that resolves to an array of memberships.
   */
  async findMembershipsByWorkspaceId(
    workspaceId: string,
  ): Promise<UserWorkspace[]> {
    return this.userWorkspaceRepository.findBy({
      workspaceId,
    });
  }

  /**
   * Finds all memberships by user ID.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to an array of memberships.
   */
  async findMembershipsByUserId(userId: string): Promise<UserWorkspace[]> {
    return this.userWorkspaceRepository.findBy({
      userId,
    });
  }

  /**
   * Creates memberships for all user-workspace pairs.
   * @param workspaceIds - The IDs of the workspaces.
   * @param userIds - The IDs of the users.
   * @returns A promise that resolves when the memberships are created.
   */
  async createMemberships(
    workspaceIds: string[],
    userIds: string[],
  ): Promise<void> {
    // TODO: Use transactions https://typeorm.io/transactions
    for (const workspaceId of workspaceIds) {
      for (const userId of userIds) {
        await this.create({ workspaceId, userId });
      }
    }
  }

  /**
   * Removes memberships for all user-workspace pairs.
   * @param workspaceIds - The IDs of the workspaces.
   * @param userIds - The IDs of the users.
   * @returns A promise that resolves when the memberships are removed.
   */
  async removeMemberships(
    workspaceIds: string[],
    userIds: string[],
  ): Promise<void> {
    // TODO: Use transactions https://typeorm.io/transactions
    for (const workspaceId of workspaceIds) {
      for (const userId of userIds) {
        await this.remove(workspaceId, userId);
      }
    }
  }
}
