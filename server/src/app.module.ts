import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { UserWorkspaceModule } from './user-workspace/user-workspace.module';

@Module({
  imports: [
    /**
     * Connect to the database with TypeORM.
     * @see: https://docs.nestjs.com/techniques/database#typeorm-integration
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin_dashboard_user',
      password: 'password',
      database: 'admin_dashboard',
      synchronize: true,
      /**
       * This saves us from manually importing entities to root module which
       * causes leaks.
       *  @see: https://docs.nestjs.com/techniques/database#auto-load-entities
       */
      autoLoadEntities: true,
    }),
    UsersModule,
    WorkspacesModule,
    UserWorkspaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
