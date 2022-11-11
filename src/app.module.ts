import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { DatabaseConfig } from './config/interfaces/database.config.interface';
import { configValidationSchema } from './config/config.schema';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<DatabaseConfig> => {
        return configService.get<DatabaseConfig>('database');
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
