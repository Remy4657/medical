import { Category } from '../category/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: {
        category: true,
      },
      order: { created_at: 'DESC' },
    });
  }
  async findByCategory(slug: string) {
    const { category, ids } =
      await this.categoryService.getCategoryWithDescendants(slug);

    const breadcrumb = await this.categoryService.getBreadcrumb(category);

    const products = await this.productRepository.find({
      where: {
        category: {
          id: In(ids),
        },
      },
      relations: {
        category: true,
      },
    });

    return {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },

      breadcrumb: breadcrumb.map((item) => ({
        name: item.name,
        slug: item.slug,
      })),

      products,
    };
  }
}
