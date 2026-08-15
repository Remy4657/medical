import { Category } from '../category/entities/category.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { ProductQueryDto } from './dto/query-product.dto';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductPrice } from './entities/product-price.entity';

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
      isPromotion,
    } = query;

    const qb = this.productRepository.createQueryBuilder('product');

    const bestVariantSubQuery = qb
      .subQuery()
      .select('pv.id')
      .from(ProductVariant, 'pv')
      .innerJoin(ProductPrice, 'pp', 'pp.variant_id = pv.id')
      .where('pv.product_id = product.id')
      .orderBy(
        '(pp.originalPrice - pp.salePrice) / NULLIF(pp.originalPrice, 0)',
        'DESC',
      )
      .addOrderBy('pv.id', 'ASC')
      .limit(1)
      .getQuery();
    if (isPromotion) {
      return this.getPromotionProducts(query);
    }
    //

    qb.leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.country', 'country')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndMapOne(
        'product.bestVariant',
        ProductVariant,
        'variant',
        `variant.id = ${bestVariantSubQuery}`,
      )
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
      .orderBy(
        `CASE
      WHEN price.sale_price < price.original_price
      THEN (price.original_price - price.sale_price) / NULLIF(price.original_price, 0)
      ELSE 0
      END`,
        'DESC',
      )
      .addOrderBy('variant.id', 'ASC')
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
        isPrimary: image.isPrimary,
      })),

      variants: product.variants.map((variant) => ({
        id: variant.id,
        packageDescription: variant.packageDescription,
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
        id: item.id,
        name: item.attribute.name,
        slug: item.attribute.slug,
        type: item.attribute.type,
        value: item.value,
      })),
    };
  }

  async getPromotionProducts(query: ProductQueryDto) {
    const { page, limit } = query;

    const now = new Date();
    const bestVariantSubQuery = this.productRepository
      .createQueryBuilder()
      .subQuery()
      .select('pv.id')
      .from(ProductVariant, 'pv')
      .innerJoin(ProductPrice, 'pp', 'pp.variant_id = pv.id')
      .where('pv.product_id = product.id')
      .andWhere('pp.salePrice < pp.originalPrice')
      .andWhere('pp.startsAt <= :now')
      .andWhere('(pp.endsAt IS NULL OR pp.endsAt >= :now)')
      .orderBy(
        '(pp.originalPrice - pp.salePrice) / NULLIF(pp.originalPrice, 0)',
        'DESC',
      )
      .addOrderBy('pv.id', 'ASC')
      .limit(1)
      .getQuery();
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.country', 'country')
      .leftJoinAndSelect('product.images', 'image')
      .leftJoinAndMapOne(
        'product.bestVariant',
        ProductVariant,
        'variant',
        `variant.id = ${bestVariantSubQuery}`,
      )
      .leftJoinAndSelect('variant.price', 'price')
      .leftJoinAndSelect('variant.unit', 'unit')

      .where('variant.id IS NOT NULL')

      .orderBy('product.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .distinct(true);

    qb.setParameter('now', now);

    const [products, total] = await qb.getManyAndCount();

    return {
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
}
