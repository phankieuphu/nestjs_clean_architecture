import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import config from './config/env.config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // set global prefix to /v1
  app.setGlobalPrefix('v1', {
    exclude: [
      { path: 'login/callback', method: RequestMethod.POST },
      { path: 'health-check', method: RequestMethod.GET },
    ],
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  // Swagger Configuration
  if (config.ENV.NODE_ENV !== 'stg' && config.ENV.NODE_ENV !== 'prd') {
    const config = new DocumentBuilder()
      .setTitle('Salus API')
      .setDescription('API Docs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  // Enable CORS
  const allowedOrigins =
    config.CORS.CORS_ORIGINS && config.CORS.CORS_ORIGINS != '*'
      ? config.CORS.CORS_ORIGINS.split(',')
      : ['*'];
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    bodyParser.json({
      limit: '10mb',
      type: ['application/json', 'application/*+json', 'json'],
    }),
  );

  app.use(
    bodyParser.urlencoded({
      limit: '10mb',
      extended: true,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'reflected-xss': 'block',
        },
      }, // Disable if you need to customize the CSP
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginResourcePolicy: { policy: 'same-origin' },
      dnsPrefetchControl: { allow: false },
      // expectCt: { enforce: true, maxAge: 86400 },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: { maxAge: 60000, includeSubDomains: true },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );

  await app.listen(3000);
}
bootstrap();
