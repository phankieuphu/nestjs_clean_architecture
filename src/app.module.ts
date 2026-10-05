import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import { ClsModule } from 'nestjs-cls';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ListCommand from './commands';
import DatabaseConfig from './config/database.config';
import config from './config/env.config';
import { configValidationsSchema } from './config/validation/validate-config';
import * as ListController from './controllers';
import * as ListEntity from './entities';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { repositories } from './repositories';
import * as ListService from './services';
import * as ListStrategy from './strategies';
import * as ListUtils from './utils';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ConfigModule.forRoot({
      validationSchema: configValidationsSchema,
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
      envFilePath: ['.production.env', '.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: (await redisStore({
          socket: { host: config.REDIS.HOST, port: config.REDIS.PORT },
        })) as unknown as CacheStore,
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(Object.values(ListEntity)),
    HttpModule,
    EventEmitterModule.forRoot(),
    CommandModule,
    PassportModule,
    JwtModule.register({
      secret: config.JWT.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT.JWT_TOKEN_EXPIRE },
    }),
  ],

  controllers: [AppController, ...Object.values(ListController)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    AppService,
    ...Object.values(ListService),
    ...Object.values(ListUtils),
    ...repositories,
    ...Object.values(ListCommand),
    ...Object.values(ListStrategy),
    JwtAuthGuard,
  ],
})
export class AppModule {}
