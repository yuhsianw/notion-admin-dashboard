import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { UserWorkspaceModule } from './user-workspace/user-workspace.module';
import {
  DATABASE_CONNECTION_CONFIG,
  HEROKU_DATABASE_CONNECTION_CONFIG,
  STATIC_FILE_SERVING_CONFIG,
} from './configs';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    /**
     * Connect to the database with TypeORM.
     * @see: https://docs.nestjs.com/techniques/database#typeorm-integration
     */
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? HEROKU_DATABASE_CONNECTION_CONFIG
        : DATABASE_CONNECTION_CONFIG,
    ),
    /**
     * Config static files serving.
     */
    ServeStaticModule.forRoot(STATIC_FILE_SERVING_CONFIG),
    /**
     * Import all modules.
     */
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
