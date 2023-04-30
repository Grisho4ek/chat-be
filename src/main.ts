import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Chat API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(5000);
}
bootstrap();
