import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PORT = 3000;

export const CORS_ORIGIN = 'http://localhost:8080';

export const DATABASE_CONNECTION_CONFIG: TypeOrmModuleOptions = {
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
};
