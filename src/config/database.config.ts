import {
  DATABASE_TYPE,
  DEFAULT_DATABASE_PORT,
  PRODUCTION_ENV,
} from './constants';
import { DatabaseConfig } from './interfaces/database.config.interface';

const toBoolean = (envVar: string): boolean => envVar === 'true';

export default (): { database: DatabaseConfig } => {
  const isProd: boolean = process.env.NODE_ENV === PRODUCTION_ENV;
  return {
    database: {
      ssl: isProd,
      extra: { ssl: isProd ? { rejectUnauthorized: false } : null },
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || DEFAULT_DATABASE_PORT,
      type: DATABASE_TYPE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: toBoolean(process.env.DB_AUTO_LOAD_ENTITIES),
      synchronize: toBoolean(process.env.DB_SYNCHRONIZE),
    },
  };
};
