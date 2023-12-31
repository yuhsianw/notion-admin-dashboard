import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWorkspaceService } from 'src/user-workspace/user-workspace.service';

interface WorkspaceChangeLists {
  addedWorkspaceIds: string[];
  removedWorkspaceIds: string[];
}

/**
 * Service class for managing users in the database.
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject abstraction of the users table.
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private userWorkspaceService: UserWorkspaceService,
  ) {}

  /**
   * Get the list of workspaces that were added and removed.
   * @param oldWorkspaceIds - The old list of workspace IDs.
   * @param newWorkspaceIds - The new list of workspace IDs.
   * @returns An object containing the added and removed workspace IDs.
   */
  private getWorkspaceChangeLists(
    oldWorkspaceIds: string[],
    newWorkspaceIds: string[],
  ): WorkspaceChangeLists {
    const removedSet = new Set(oldWorkspaceIds);
    const addedSet = new Set<string>();
    newWorkspaceIds.forEach((id) => {
      if (removedSet.has(id)) {
        removedSet.delete(id);
      } else {
        addedSet.add(id);
      }
    });
    return {
      addedWorkspaceIds: Array.from(addedSet),
      removedWorkspaceIds: Array.from(removedSet),
    };
  }

  /**
   * Update the user's memberships.
   * @param userId - The ID of the user.
   * @param newWorkspaceIds - The new list of workspace IDs.
   * @returns A promise that resolves when the memberships are updated.
   */
  private async updateMemberships(
    userId: string,
    newWorkspaceIds: string[],
  ): Promise<void> {
    const oldWorkspaceIds = (
      await this.userWorkspaceService.findMembershipsByUserId(userId)
    ).map((membership) => membership.workspaceId);
    const { addedWorkspaceIds, removedWorkspaceIds } =
      this.getWorkspaceChangeLists(oldWorkspaceIds, newWorkspaceIds);
    await this.userWorkspaceService.createMemberships(addedWorkspaceIds, [
      userId,
    ]);
    await this.userWorkspaceService.removeMemberships(removedWorkspaceIds, [
      userId,
    ]);
  }

  /**
   * Create a new user.
   * @param userDto - The user data.
   * @returns The created user.
   */
  async create(userDto: CreateUserDto) {
    const newUser = await this.usersRepository.save(
      Object.assign(new User(), userDto),
    );
    if (userDto.workspaces !== undefined) {
      await this.updateMemberships(newUser.id, userDto.workspaces);
    }
    return newUser;
  }

  /**
   * Get all users.
   * @returns A list of users.
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user.
   * @returns The user with the specified ID, or null if not found.
   */
  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user.
   * @param updateUserDto - Object containing fields to update.
   * @returns The updated user.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    // Update user properties from the DTO
    if (updateUserDto.firstName !== undefined) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.workspaces !== undefined) {
      await this.updateMemberships(user.id, updateUserDto.workspaces);
    }

    // Save the updated user to the database
    return this.usersRepository.save(user);
  }

  /**
   * Remove a user by ID.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves when the user is removed.
   */
  async remove(id: string): Promise<void> {
    await this.updateMemberships(id, []);
    await this.usersRepository.delete(id);
  }
}
