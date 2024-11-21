/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger as PinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import { ZodValidationPipe } from 'nestjs-zod';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ResponseExceptionFilter } from './interceptors/response-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { TraceIdInterceptor } from './interceptors/trace-id.interceptor';
import { ZodValidationExceptionFilter } from './interceptors/zod-validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.useGlobalFilters(
    new ResponseExceptionFilter(),
    new ZodValidationExceptionFilter()
  );
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new TraceIdInterceptor(),
    new ResponseInterceptor()
  );

  app.useLogger(app.get(PinoLogger));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
