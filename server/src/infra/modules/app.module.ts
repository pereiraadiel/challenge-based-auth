import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { RedisModule } from './redis.module';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    RedisModule,
    // AuthInterceptor,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
