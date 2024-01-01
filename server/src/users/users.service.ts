import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWorkspaceService } from 'src/user-workspace/user-workspace.service';
import { GetUserDto } from './dto/get-user.dto';

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
   * Get the user's memberships.
   * @param userId - The ID of the user.
   * @returns A promise that resolves with an array of workspace IDs.
   */
  private async getUserMemberships(userId: string): Promise<string[]> {
    return (
      await this.userWorkspaceService.findMembershipsByUserId(userId)
    ).map((membership) => membership.workspaceId);
  }

  /**
   * Create a GetUserDto object from a User object.
   * @param user - The User object.
   * @returns A promise that resolves with a GetUserDto object.
   */
  async createGetUserDto(user: User): Promise<GetUserDto> {
    const userDto: GetUserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      workspaces: await this.getUserMemberships(user.id),
    };
    return userDto;
  }

  /**
   * Create a new user.
   * @param userDto - The CreateUserDto object.
   * @returns A promise that resolves with a GetUserDto object of the created user.
   */
  async create(userDto: CreateUserDto): Promise<GetUserDto> {
    const newUser = await this.usersRepository.save(
      Object.assign(new User(), userDto),
    );
    if (userDto.workspaces !== undefined) {
      await this.updateMemberships(newUser.id, userDto.workspaces);
    }
    return this.createGetUserDto(newUser);
  }

  /**
   * Get all users.
   * @returns A promise that resolves with an array of GetUserDto objects.
   */
  async findAll(): Promise<GetUserDto[]> {
    const users = await this.usersRepository.find();
    return Promise.all(users.map((user) => this.createGetUserDto(user)));
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves with a GetUserDto object of the found user, or null if not found.
   */
  async findOne(id: string): Promise<GetUserDto | null> {
    const user = await this.usersRepository.findOneBy({ id });
    return user ? this.createGetUserDto(user) : null;
  }

  /**
   * Update a user.
   * @param id - The ID of the user.
   * @param updateUserDto - The UpdateUserDto object.
   * @returns A promise that resolves with a GetUserDto object of the updated user.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
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

    const updatedUser = await this.usersRepository.save(user);
    return this.createGetUserDto(updatedUser);
  }

  /**
   * Remove a user.
   * @param id - The ID of the user.
   * @returns A promise that resolves when the user is removed.
   */
  async remove(id: string): Promise<void> {
    await this.updateMemberships(id, []);
    await this.usersRepository.delete(id);
  }
}
