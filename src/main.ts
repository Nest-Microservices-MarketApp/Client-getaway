import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

const API_PREFIX = 'api';
const JSON_LIMIT = '50mb';

async function configureMiddleware(app: INestApplication<any>) {
  app.use(json({ limit: JSON_LIMIT }));

  app.use(urlencoded({ extended: true, limit: JSON_LIMIT }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.setGlobalPrefix(API_PREFIX);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    allowedHeaders: 'Content-Type, Authorization',
  });
}

async function bootstrap() {
  const logger = new Logger('ClientGetaway - Bootstrap');
  const app = await NestFactory.create(AppModule);

  await configureMiddleware(app);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MarketApp API')
    .setDescription('The MarketApp API description')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envs.port);

  logger.log(`Getaway running on: ${await app.getUrl()}/api`);
  logger.log(`Swagger running on: ${await app.getUrl()}/api/docs`);
}

bootstrap();
