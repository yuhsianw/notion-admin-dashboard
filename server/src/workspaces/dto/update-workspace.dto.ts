import { IsBoolean, IsString, IsOptional, IsArray } from 'class-validator';

/**
 * Data transfer object for updating a workspace.
 */
export class UpdateWorkspaceDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  domain: string;

  @IsOptional()
  @IsBoolean()
  samlEnabled: boolean;

  @IsOptional()
  @IsArray()
  members: string[];
}
