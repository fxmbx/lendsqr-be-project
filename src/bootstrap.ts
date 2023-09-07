import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { LoggerService } from '@modules/logger/logger.service';

export const bootstrap = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend sandbox')
    .setDescription('The backend sandbox description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.SERVER_PORT ?? 8080, async () => {
    console.log(`============
    \n NODE_ENV: ${process.env.NODE_ENV}
    \n The server is running on ${process.env.SERVER_HOST}/
    \n The Swagger URL is ${process.env.SERVER_HOST}/api
    \n ============`);
  });

  return app;
};
