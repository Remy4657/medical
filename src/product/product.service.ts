import { Category } from '../category/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { ProductQueryDto } from './dto/query-product.dto';

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
      order: { createdAt: 'DESC' },
    });
  }
  async findByCategory(slug: string, page: number = 1, limit: number = 15) {
    const { category, ids } =
      await this.categoryService.getCategoryWithDescendants(slug);

    const breadcrumb = await this.categoryService.getBreadcrumb(category);

    const [products, total] = await this.productRepository.findAndCount({
      where: {
        category: {
          id: In(ids),
        },
      },
      relations: {
        category: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
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

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    };
  }

  async getProducts(query: ProductQueryDto) {
    const { category, page, limit, order, sortBy } = query;

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.country', 'country')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.variants', 'variant')
      .leftJoinAndSelect('variant.price', 'price')
      .leftJoinAndSelect('variant.unit', 'unit')

      .skip((page - 1) * limit)
      .take(limit);

    if (category) {
      const { ids } =
        await this.categoryService.getCategoryWithDescendants(category);

      qb.andWhere('product.category_id IN (:...ids)', { ids }); // Filter by category and its descendants
    }

    // sorting
    if (sortBy === 'bestSelling') {
      qb.orderBy('product.total_sold', 'DESC');
    } else if (sortBy === 'price') {
      qb.addSelect(
        `(
        SELECT MIN(pp.sale_price)
        FROM product_variant pv
        INNER JOIN product_price pp
        ON pp.variant_id = pv.id
        WHERE pv.product_id = product.id
        )`,
        'min_price',
      );
      qb.orderBy('min_price', order === 'asc' ? 'ASC' : 'DESC');
    }
    qb.addOrderBy('product.created_at', 'DESC');
    qb.addOrderBy('product.id', 'DESC');

    const [products, total] = await qb.getManyAndCount();
    const { category: categorySlug } =
      await this.categoryService.getCategoryWithDescendants(category);

    const breadcrumb = await this.categoryService.getBreadcrumb(categorySlug);
    return {
      products,
      category: categorySlug,
      breadcrumb,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    };
  }
}
