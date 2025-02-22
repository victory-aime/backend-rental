import { PrismaService } from '_config/services';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, ProductService],
  controllers: [ProductsController],
  exports: [ProductService],
})
export class ProductsModule {}
