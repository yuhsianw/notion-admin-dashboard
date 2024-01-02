import { IsOptional, IsEmail, IsNotEmpty, IsArray } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  workspaces?: string[];
}
