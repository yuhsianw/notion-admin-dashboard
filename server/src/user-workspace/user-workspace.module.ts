import { Module } from '@nestjs/common';
import { UserWorkspaceService } from './user-workspace.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWorkspace } from './user-workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWorkspace])],
  providers: [UserWorkspaceService],
  exports: [UserWorkspaceService],
})
export class UserWorkspaceModule {}
