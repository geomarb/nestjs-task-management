import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { AppConfig } from './config/interfaces/app.config.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  const port = appConfig.port;

  await app.listen(port);
  logger.log(`Application listening on por ${port}`);
}
bootstrap();
