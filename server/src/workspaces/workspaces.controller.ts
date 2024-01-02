import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { GetWorkspaceDto } from './dto/get-workspace.dto';
import { API_BASE_URL } from 'src/config/constants';

/**
 * Controller for managing workspace operations.
 * TODO: Return the correct error code. Default is 500.
 */
@Controller(`${API_BASE_URL}/workspaces`)
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}

  /**
   * Create a new workspace.
   * @param createWorkspaceDto - The data for creating a workspace.
   * @returns A promise that resolves to the created workspace.
   */
  @Post()
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<GetWorkspaceDto> {
    return this.workspacesService.create(createWorkspaceDto);
  }

  /**
   * Get all workspaces.
   * @returns A promise that resolves to an array of workspaces.
   */
  @Get()
  findAll(): Promise<GetWorkspaceDto[]> {
    return this.workspacesService.findAll();
  }

  /**
   * Get a workspace by ID.
   * @param id - The ID of the workspace.
   * @returns A promise that resolves to the workspace with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetWorkspaceDto> {
    return this.workspacesService.findOne(id);
  }

  /**
   * Update a workspace by ID.
   * @param id - The ID of the workspace to update.
   * @param workspace - The updated workspace data.
   * @returns A promise that resolves to the updated workspace.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() workspace: UpdateWorkspaceDto,
  ): Promise<GetWorkspaceDto> {
    return this.workspacesService.update(id, workspace);
  }

  /**
   * Delete a workspace by ID.
   * @param id - The ID of the workspace to delete.
   * @returns A promise that resolves when the workspace is deleted.
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.workspacesService.remove(id);
  }
}
