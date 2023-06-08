import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './infra/modules/app.module';
import { ExceptionHandler } from './infra/handlers/exception.handler';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { RedisProvider } from './infra/providers/redis.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.use(
    cors({
      allowedHeaders: '*',
      origin: '*',
    }),
  );
  app.useGlobalFilters(new ExceptionHandler());
  app.useGlobalPipes(new ValidationPipe());

  // Capturar eventos SIGTERM e SIGINT
  process.on('SIGTERM', async () => {
    const redis = app.get(RedisProvider);
    redis.disconnect();

    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    const redis = app.get(RedisProvider);
    redis.disconnect();

    await app.close();
    process.exit(0);
  });

  await app.listen(3000);
}
bootstrap();
