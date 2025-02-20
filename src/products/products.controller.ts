import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

//@ApiBasicAuth()
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
    return this.productService.createProduct(dto);
  }

  @Get(APIS_URL.PRODUCTS_MANAGEMENT.GET_ALL_PRODUCTS)
  async getAllProducts(@Query('storeId') storeId: string) {
    return this.productService.getProducts(storeId);
  }
}
