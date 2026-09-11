import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';

import { SearchProductItem, SearchSuggestResponse } from './types/search.types';
import { SearchKeyword } from './entities/search.entity';
import { ProductVariant } from '../product/entities/product-variant.entity';
import { ProductPrice } from '../product/entities/product-price.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchKeyword)
    private readonly searchKeywordRepository: Repository<SearchKeyword>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // ============================================================
  // SUGGEST
  // ============================================================

  async suggest(keyword: string): Promise<SearchSuggestResponse> {
    const q = keyword?.trim();

    if (!q || q.length < 2) {
      return {
        keywordSuggestions: [],
        categories: [],
        products: [],
        total: 0,
      };
    }

    const [keywordSuggestions, categories, products, total] = await Promise.all(
      [
        this.getKeywordSuggestions(q),
        this.getCategorySuggestions(q),
        this.getProductSuggestions(q),
        this.countProducts(q),
      ],
    );

    return {
      keywordSuggestions,
      categories,
      products,
      total,
    };
  }

  // ============================================================
  // KEYWORD SUGGESTION
  // ============================================================

  private async getKeywordSuggestions(keyword: string): Promise<string[]> {
    const normalizedKeyword = this.normalize(keyword);

    const data = await this.searchKeywordRepository
      .createQueryBuilder('search_keyword')
      .where('search_keyword.isActive = :isActive', {
        isActive: true,
      })
      .andWhere(
        `
          search_keyword.normalized_keyword
          LIKE :keyword
          `,
        {
          keyword: `${normalizedKeyword}%`,
        },
      )
      .orderBy('search_keyword.priority', 'DESC')
      .addOrderBy('LENGTH(search_keyword.normalized_keyword)', 'ASC')
      .limit(5)
      .getMany();

    return data.map((item) => item.keyword);
  }

  // ============================================================
  // CATEGORY
  // ============================================================

  private async getCategorySuggestions(keyword: string) {
    const normalizedKeyword = this.normalize(keyword);

    return this.categoryRepository
      .createQueryBuilder('category')
      .where(
        `
        unaccent(lower(category.name))
        LIKE :keyword
        `,
        {
          keyword: `%${normalizedKeyword}%`,
        },
      )
      .orderBy('category.name', 'ASC')
      .limit(3)
      .getMany()
      .then((categories) =>
        categories.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
        })),
      );
  }

  // ============================================================
  // PRODUCT SUGGESTION
  // ============================================================

  private async getProductSuggestions(
    keyword: string,
  ): Promise<SearchProductItem[]> {
    const qb = this.createProductSearchQuery(keyword);

    const products = await qb.limit(5).getMany();

    return products.map((product) => this.mapProduct(product));
  }

  // ============================================================
  // COUNT
  // ============================================================

  private async countProducts(keyword: string) {
    const qb = this.createProductSearchQuery(keyword, false);

    return qb.getCount();
  }

  // ============================================================
  // FULL SEARCH
  // ============================================================

  async search(keyword: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const normalizedKeyword = this.normalize(keyword);

    //const qb = this.createProductSearchQuery(keyword);
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
    qb.leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.country', 'country')
      .leftJoinAndSelect(
        'product.images',
        'image',
        'image.is_primary = :isPrimary AND image.sort_order = :sortOrder',
        {
          isPrimary: true,
          sortOrder: 0,
        },
      )
      .leftJoinAndMapOne(
        'product.bestVariant',
        ProductVariant,
        'variant',
        `variant.id = ${bestVariantSubQuery}`,
      )
      .leftJoinAndSelect('variant.price', 'price')
      .leftJoinAndSelect('variant.unit', 'unit')

      .skip((page - 1) * limit)
      .take(limit)
      .addOrderBy('product.created_at', 'DESC')
      .addOrderBy('product.id', 'DESC')
      .where(
        `
      (
        unaccent(lower(product.name))
          LIKE :keyword
        OR unaccent(lower(category.name)) LIKE :keyword
        OR unaccent(lower(product.description))
          LIKE :keyword
      )
      `,
        {
          keyword: `%${normalizedKeyword}%`,
        },
      )

      // Ranking
      .addSelect(
        `CASE
    WHEN unaccent(lower(product.name)) = :exactKeyword
      THEN 1

    WHEN unaccent(lower(product.name)) LIKE :prefixKeyword
      THEN 2

    WHEN unaccent(lower(product.name)) LIKE :keyword
      THEN 3

    ELSE 4
  END`,
        'search_rank',
      );
    qb.addOrderBy('search_rank', 'ASC');
    qb.setParameters({
      exactKeyword: normalizedKeyword,
      prefixKeyword: `${normalizedKeyword}%`,
      keyword: `%${normalizedKeyword}%`,
    });
    const [products, total] = await qb.getManyAndCount();

    // const [products, total] = await Promise.all([
    //   qb.skip(skip).take(limit).getMany(),

    //   this.createProductSearchQuery(keyword, false).getCount(),
    // ]);

    return {
      // products: products.map((product) => this.mapProduct(product)),
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    };
  }

  // ============================================================
  // BUILD PRODUCT QUERY
  // ============================================================

  private createProductSearchQuery(
    keyword: string,
    withRelations = true,
  ): SelectQueryBuilder<Product> {
    const normalizedKeyword = this.normalize(keyword);

    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (withRelations) {
      qb.leftJoinAndSelect('product.images', 'image')
        .leftJoinAndSelect('product.variants', 'variant')
        .leftJoinAndSelect('variant.price', 'price')
        .leftJoinAndSelect('variant.unit', 'unit');
    }

    qb.where(
      `
      (
        unaccent(lower(product.name))
          LIKE :keyword
        OR unaccent(lower(category.name)) LIKE :keyword
        OR unaccent(lower(product.description))
          LIKE :keyword
      )
      `,
      {
        keyword: `%${normalizedKeyword}%`,
      },
    );

    // Ranking
    qb.addSelect(
      `CASE
    WHEN unaccent(lower(product.name)) = :exactKeyword
      THEN 1

    WHEN unaccent(lower(product.name)) LIKE :prefixKeyword
      THEN 2

    WHEN unaccent(lower(product.name)) LIKE :keyword
      THEN 3

    ELSE 4
  END`,
      'search_rank',
    );
    qb.addOrderBy('search_rank', 'ASC');
    qb.setParameters({
      exactKeyword: normalizedKeyword,
      prefixKeyword: `${normalizedKeyword}%`,
      keyword: `%${normalizedKeyword}%`,
    });

    // qb.addOrderBy('product.totalSold', 'DESC');

    return qb;
  }

  // ============================================================
  // NORMALIZE
  // ============================================================

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
  }

  // ============================================================
  // MAP PRODUCT
  // ============================================================

  private mapProduct(product: Product): SearchProductItem {
    const variant = product.variants?.[0];

    const image = product.images?.[0];

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: image?.imageUrl ?? null,

      price: variant?.price
        ? {
            originalPrice: variant.price.originalPrice,
            salePrice: variant.price.salePrice,
          }
        : null,

      unit: variant?.unit
        ? {
            id: variant.unit.id,
            name: variant.unit.name,
            code: variant.unit.code,
          }
        : null,
    };
  }
}
