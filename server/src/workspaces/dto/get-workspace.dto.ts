import { IsArray, IsBoolean, IsString } from 'class-validator';

/**
 * Data transfer object for a workspace returned to client.
 */
export class GetWorkspaceDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  domain: string;

  @IsBoolean()
  samlEnabled: boolean;

  @IsArray()
  members: string[];
}
