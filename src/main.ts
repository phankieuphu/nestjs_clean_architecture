import { Logger, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import config from './config/env.config';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // set global prefix to /v1
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health-check', method: RequestMethod.GET }],
  });

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableShutdownHooks();

  // Swagger Configuration
  if (!['stg', 'prd', 'production'].includes(config.ENV.NODE_ENV)) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NestJS Clean Architecture API')
      .setDescription('API Docs')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  // Enable CORS. `true` reflects the request origin, a literal '*' is not allowed together with credentials
  const allowedOrigins =
    config.CORS.CORS_ORIGINS && config.CORS.CORS_ORIGINS !== '*'
      ? config.CORS.CORS_ORIGINS.split(',').map((origin) => origin.trim())
      : true;
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Override Nest's built-in body parsers (default limit is 100kb)
  app.useBodyParser('json', {
    limit: '10mb',
    type: ['application/json', 'application/*+json'],
  });
  app.useBodyParser('urlencoded', { limit: '10mb', extended: true });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginResourcePolicy: { policy: 'same-origin' },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: { maxAge: 60000, includeSubDomains: true },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: { policy: 'no-referrer' },
    }),
  );

  await app.listen(config.ENV.PORT);
  Logger.log(`Application is running on port ${config.ENV.PORT}`, 'Bootstrap');
}
bootstrap();
