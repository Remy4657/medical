import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get(':parentSlug/children')
  async getChildren(@Param('parentSlug') parentSlug: string) {
    return this.categoryService.getChildrenCategory(parentSlug);
  }
}
