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
import { GetUserDto } from './dto/get-user.dto';
import { API_BASE_URL } from 'src/configs';

/**
 * Controller for managing user operations.
 */
@Controller(`${API_BASE_URL}/users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   * @param createUserDto - The data for creating a user.
   * @returns A promise that resolves to the created user.
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get all users.
   * @returns A promise that resolves to an array of users.
   */
  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return this.usersService.findAll();
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the user with the specified ID.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    return this.usersService.findOne(id);
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user.
   * @param updateUserDto - The data for updating the user.
   * @returns A promise that resolves to the updated user.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Delete a user by ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves when the user is deleted.
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
