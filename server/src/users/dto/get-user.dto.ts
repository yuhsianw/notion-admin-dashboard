import { IsEmail, IsString, IsArray } from 'class-validator';

/**
 * Data transfer object to return to client.
 */
export class GetUserDto {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsArray()
  workspaces: string[];
}
