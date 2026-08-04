import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({
      where: {
        parent: IsNull(), // Chỉ lấy danh mục gốc
      },
      relations: {
        children: true,
      },
      order: {
        id: 'ASC',
        children: {
          id: 'ASC',
        },
      },
    });
  }
  async getCategoryWithDescendants(slug: string) {
    // trả về danh mục và tất cả các danh mục con của nó
    const categories = await this.categoryRepository.find();
    const category = categories.find((c) => c.slug === slug);

    const ids: number[] = [];

    const dfs = (id: number) => {
      ids.push(id);

      categories
        .filter((c) => c.parent_id === id)
        .forEach((child) => dfs(child.id));
    };

    dfs(category?.id);

    return {
      category,
      ids,
    };
  }
  async getBreadcrumb(category: Category): Promise<Category[]> {
    const breadcrumb: Category[] = [];

    let current = category;

    while (current) {
      breadcrumb.unshift(current);

      if (!current.parent_id) break;

      current = await this.categoryRepository.findOne({
        where: {
          id: current.parent_id,
        },
      });
    }

    return breadcrumb;
  }
}
