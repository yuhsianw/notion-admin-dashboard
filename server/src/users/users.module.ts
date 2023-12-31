import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserWorkspaceModule } from 'src/user-workspace/user-workspace.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserWorkspaceModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
