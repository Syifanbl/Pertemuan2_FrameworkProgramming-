
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { AuthModule } from './auth/auth.module.js';
import { LogMiddlewareMiddleware } from './middlewares/log-middleware/log-middleware.middleware.js';
import Joi from 'joi';
import { inject } from 'vitest';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string(),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().default(''),
        DB_PASSWORD: Joi.string().default(''),
        DB_DATABASE: Joi.string().default(''),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port:configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password : configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),


        // otomatis sync .entity ke table
        autoLoadEntities: true,

        synchronize: configService.get<string>('NODE_ENV') === 'development'
      })
    })
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddlewareMiddleware)
      .forRoutes('*');
  }
}
