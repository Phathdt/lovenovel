import { LoggerModule } from 'nestjs-pino';
import { PrismaModule, PrismaServiceOptions } from 'nestjs-prisma';
import pretty from 'pino-pretty';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: ['.env'],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
          },
        },
        customProps: (req) => {
          return {
            traceId: req['traceId'],
          };
        },
      },
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory(configService: ConfigService): PrismaServiceOptions {
        return {
          prismaOptions: {
            log: [configService.getOrThrow('LOG_LEVEL')],
            datasourceUrl: configService.getOrThrow('DATABASE_URL'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
