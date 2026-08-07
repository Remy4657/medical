import { Category } from '../category/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getProducts(query: ProductQueryDto) {
    const {
      category,
      page,
      limit,
      order,
      sortBy,
      brand,
      country,
      minPrice,
      maxPrice,
    } = query;

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
    if (brand?.length) {
      qb.andWhere('brand.slug IN (:...brands)', {
        brands: brand,
      });
    }
    if (country?.length) {
      qb.andWhere('country.code IN (:...countries)', {
        countries: country,
      });
    }
    if (minPrice || maxPrice) {
      qb.andWhere(
        `EXISTS (
        SELECT 1
        FROM product_variant variantFilter
        INNER JOIN product_price priceFilter
          ON priceFilter.variant_id = variantFilter.id
        WHERE variantFilter.product_id = product.id
        ${
          minPrice !== undefined
            ? 'AND priceFilter.sale_price >= :minPrice'
            : ''
        }
        ${
          maxPrice !== undefined
            ? 'AND priceFilter.sale_price <= :maxPrice'
            : ''
        }
      )`,
        {
          ...(minPrice !== undefined && { minPrice }),
          ...(maxPrice !== undefined && { maxPrice }),
        },
      );
    }
    // sorting
    if (sortBy === 'bestSelling') {
      qb.orderBy('product.total_sold', 'DESC');
    } else if (sortBy === 'price') {
      // subquery lấy mức variant của sản phẩm có giá thấp nhất để đại diện giá cho sản phẩm
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

  async getProductDetail(slug: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.country', 'country')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndSelect('product.variants', 'variant')
      .leftJoinAndSelect('variant.price', 'price')
      .leftJoinAndSelect('variant.unit', 'unit')
      .leftJoinAndSelect('product.attributes', 'productAttribute')
      .leftJoinAndSelect('productAttribute.attribute', 'attribute')
      .where('product.slug = :slug', { slug })
      .getOne();

    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    const breadcrumb = await this.categoryService.getBreadcrumb(
      product.category,
    );

    return this.toProductDetailResponse(product, breadcrumb);
  }
  private toProductDetailResponse(product: Product, breadcrumb: any[]) {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      totalSold: product.totalSold,
      category: product.category.name,
      brand: product.brand.name,
      country: product.country.name,

      breadcrumb,

      images: product.images.map((image) => ({
        id: image.id,
        url: image.imageUrl,
      })),

      variants: product.variants.map((variant) => ({
        id: variant.id,

        price: variant.price
          ? {
              originalPrice: variant.price.originalPrice,
              salePrice: variant.price.salePrice,
            }
          : null,

        unit: variant.unit
          ? {
              id: variant.unit.id,
              name: variant.unit.name,
            }
          : null,
      })),

      attributes: product.attributes.map((item) => ({
        name: item.attribute.name,
        slug: item.attribute.slug,
        type: item.attribute.type,
        value: item.value,
      })),
    };
  }
}
