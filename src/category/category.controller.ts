import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '_config/guard';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '_config/enum/global.enum';
import { APIS_URL } from '_config/endpoints/api';

@ApiTags(SWAGGER_TAGS.CATEGORIES)
@Controller(APIS_URL.CATEGORIES.GLOBAL_ROUTES)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post(APIS_URL.CATEGORIES.ADD)
  async addCategory(@Body() body: { name: string }) {
    return this.categoryService.addCategory(body.name);
  }
}
