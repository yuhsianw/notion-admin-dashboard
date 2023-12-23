import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
/**
 * Service responsible for managing users in the database.
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
   * Creates a new user in the database.
   * @param user - The user object to be created.
   * @returns A promise that resolves to the created user.
   */
  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of users.
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Retrieves a user by their ID from the database.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the retrieved user, or null if not found.
   */
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  /**
   * Updates a user in the database.
   * @param user - The user object to be updated.
   * @returns A promise that resolves to the updated user.
   */
  update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  /**
   * Removes a user from the database.
   * @param id - The ID of the user to remove.
   * @returns A promise that resolves when the user is successfully removed.
   */
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
