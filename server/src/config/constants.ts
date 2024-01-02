import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import exp from 'constants';
import { join } from 'path';

/**
 * Default port for the server.
 */
export const DEFAULT_PORT = 3000;

/**
 * Config for CORS.
 */
export const CORS_ORIGIN = 'http://localhost:8080';

/**
 * Config for database connection.
 */
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

/**
 * Config for serving static files.
 */
export const STATIC_FILE_SERVING_CONFIG = {
  rootPath: join(__dirname, '..', '..', 'public', 'client'),
};

/**
 * Base URL for API endpoints.
 */
export const API_BASE_URL = '/api';
