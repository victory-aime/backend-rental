import { Body, Controller, Post, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post('add')
  async addCategory(@Body() body: { name: string }) {
    return this.categoryService.addCategory(body.name);
  }
}
