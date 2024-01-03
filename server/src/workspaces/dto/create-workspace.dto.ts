import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for creating a workspace.
 */
export class CreateWorkspaceDto {
  // TODO: Add back validation decorators after completing error handling.
  // @IsNotEmpty()
  @IsString()
  name: string;

  // @IsNotEmpty()
  @IsString()
  domain: string;

  // @IsNotEmpty()
  @IsBoolean()
  samlEnabled: boolean;

  @IsArray()
  members: string[];
}
