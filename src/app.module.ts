import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { UsersModule } from './users';
import { ProductsModule } from './products';
import { CategoryModule } from './category/category.module';
import { ProductCleanupService } from '_config/services/clean-up.service';
import { PrismaService } from '_config/services';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Rental-Platform', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [ProductCleanupService, PrismaService],
})
export class AppModule {}
