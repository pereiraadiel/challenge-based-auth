import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './infra/modules/app.module';
import { ExceptionHandler } from './infra/handlers/exception.handler';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new ExceptionHandler());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
