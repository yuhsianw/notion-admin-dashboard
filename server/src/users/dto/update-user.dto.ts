import { IsOptional, IsEmail, IsArray } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  // BUG: Email validation Not working.
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  workspaces?: string[];
}
