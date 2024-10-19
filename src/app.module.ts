import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-yet';
import { ClsModule } from 'nestjs-cls';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ListCommand from './commands';
import { AwsConfig } from './config/aws.config';
import DatabaseConfig from './config/database.config';
import config from './config/env.config';
import { configValidationsSchema } from './config/validation/validate-config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import * as ListListener from './listeners';
import { repositories } from './repositories';
import * as ListService from './services';
import * as ListUtils from './utils';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
      }),
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
    }),
    TypeOrmModule.forFeature([ListEntity.User]),
    ConfigModule.forRoot({
      validationSchema: configValidationsSchema,
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
      envFilePath: ['.production.env', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
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
    BaseSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    ListService.ServiceLogger,
    AppService,
    ...Object.values(ListService),
    ...Object.values(ListUtils),
    ...repositories,
    ...Object.values(ListListener),
    ...Object.values(ListCommand),
    ...Object.values(ListStrategy),
    SamlStrategy,
    AwsConfig,
    OrGuard,
    GooglePubSubAuthGuard,
    JwtAuthGuard,
  ],
})
export class AppModule {}
