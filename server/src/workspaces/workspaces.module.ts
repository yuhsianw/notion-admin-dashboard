import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './workspaces.entity';
import { UserWorkspaceModule } from 'src/user-workspace/user-workspace.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace]), UserWorkspaceModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
