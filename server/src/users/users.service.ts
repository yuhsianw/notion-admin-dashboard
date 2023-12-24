import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
/**
 * Service class for managing users in the database.
 */
export class UsersService {
  constructor(
    /**
     * Inject abstraction of the users table.
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   * @param user - The user data.
   * @returns The created user.
   */
  create(user: CreateUserDto) {
    return this.usersRepository.save(user);
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
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user.
   * @param updateUserDto - The updated user data.
   * @returns The updated user.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
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

    // Save the updated user to the database
    return this.usersRepository.save(user);
  }

  /**
   * Remove a user by ID.
   * @param id - The ID of the user to remove.
   */
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
