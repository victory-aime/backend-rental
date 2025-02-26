import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { CreateProductDto } from './products.dto';
import { ProductService } from './products.service';
import { SWAGGER_TAGS } from '_config/enum/global.enum';
import { APIS_URL } from '_config/endpoints/api';
import { JwtAuthGuard } from '_config/guard';

@ApiBasicAuth()
@ApiTags(SWAGGER_TAGS.PRODUCTS_MANAGEMENT)
@Controller(APIS_URL.PRODUCTS_MANAGEMENT.GLOBAL_ROUTES)
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post(APIS_URL.PRODUCTS_MANAGEMENT.NEW_PRODUCT)
  @ApiOperation({ summary: 'Créer un produit' })
  @ApiCreatedResponse({ description: 'Produit créé avec succès.' })
  @ApiBadRequestResponse({
    description: 'Données invalides ou catégorie inexistante.',
  })
  @ApiNotFoundResponse({ description: 'Boutique introuvable.' })
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @Get(APIS_URL.PRODUCTS_MANAGEMENT.GET_ALL_PRODUCTS)
  @UseGuards(JwtAuthGuard)
  async getAllProducts(@Query('storeId') storeId: string) {
    return this.productService.getProducts(storeId);
  }

  @Get(APIS_URL.PRODUCTS_MANAGEMENT.TRASH_LIST)
  @UseGuards(JwtAuthGuard)
  async getTrashProducts(@Query('storeId') storeId: string) {
    return this.productService.getTrashProducts(storeId);
  }

  @Patch(APIS_URL.PRODUCTS_MANAGEMENT.UPDATE_PRODUCT)
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Body() data: any) {
    return this.productService.updateProduct(data);
  }

  @Put(APIS_URL.PRODUCTS_MANAGEMENT.SOFT_DELETE_PRODUCT)
  @UseGuards(JwtAuthGuard)
  async softDeleteProduct(@Query('productId') productId: string) {
    return this.productService.softdeleteProduct(productId);
  }

  @Post(APIS_URL.PRODUCTS_MANAGEMENT.RESTORE_PRODUCT)
  @UseGuards(JwtAuthGuard)
  async restoreProduct(@Query('productId') productId: string) {
    return this.productService.restoreProduct(productId);
  }

  @Delete(APIS_URL.PRODUCTS_MANAGEMENT.DELETE_PRODUCT)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Query('productId') productId: string) {
    return this.productService.deletePermanently(productId);
  }
}
