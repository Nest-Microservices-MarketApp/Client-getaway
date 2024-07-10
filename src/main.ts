import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envs } from './config';
import { NotFoundExceptionFilter } from './common/filters/notFoundException.filter';

async function bootstrap() {
  const logger = new Logger('ClientGetaway - Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MarketApp API')
    .setDescription('The MarketApp API description')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(envs.port);

  logger.log(`Getaway running on http://localhost:${envs.port}/api`);
  logger.log(`Swagger running on http://localhost:${envs.port}/api/docs`);
}

bootstrap();
