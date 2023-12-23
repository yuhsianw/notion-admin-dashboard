import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { Workspace } from './workspaces/workspaces.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin_dashboard_user',
      password: 'password',
      database: 'admin_dashboard',
      entities: [User, Workspace],
      synchronize: true,
      // avoid manually importing entities and causing leaks
      // https://docs.nestjs.com/techniques/database#auto-load-entities
      autoLoadEntities: true,
    }),
    UsersModule,
    WorkspacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}