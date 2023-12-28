import { IsBoolean, IsString, IsOptional } from 'class-validator';

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
}
