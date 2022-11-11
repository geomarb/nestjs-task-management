import { PostgresType } from '../postgres.type';

interface SslOptions {
  rejectUnauthorized: boolean;
}

interface ExtraOptions {
  ssl: SslOptions | null;
}

export interface DatabaseConfig {
  ssl: boolean;
  extra: ExtraOptions;
  host: string;
  port: number;
  type: PostgresType;
  username: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
}
