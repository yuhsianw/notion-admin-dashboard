import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Controller for managing user operations.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   * @param createUserDto - The data for creating a user.
   * @returns The created user.
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get all users.
   * @returns An array of users.
   */
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user.
   * @returns The user with the specified ID.
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user.
   * @param updateUserDto - The data for updating the user.
   * @returns The updated user.
   */
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete a user by ID.
   * @param id - The ID of the user.
   * @returns The deleted user.
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
