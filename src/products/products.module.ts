import { PrismaService } from '_config/services';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [PrismaService, ProductService],
  controllers: [ProductsController],
  exports: [ProductService],
})
export class ProductsModule {}
