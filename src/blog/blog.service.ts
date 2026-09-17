import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogCategory } from './entities/blog-category.entity';
import { DataSource, Repository } from 'typeorm';
import { BlogPost, BlogStatus } from './entities/blog-post.entity';
import { BlogImage } from './entities/blog-image.entity';
import { GetBlogDto } from './dto/get-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
    @InjectRepository(BlogCategory)
    private readonly blogCategoryRepository: Repository<BlogCategory>,
  ) {}

  async create(dto: CreateBlogDto) {
    return this.dataSource.transaction(async (manager) => {
      const category = await manager.findOne(BlogCategory, {
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Blog category not found');
      }

      const post = manager.create(BlogPost, {
        categoryId: dto.categoryId,
        title: dto.title,
        slug: dto.slug,
        excerpt: dto.excerpt ?? null,
        content: dto.content,
        thumbnail: dto.thumbnail ?? null,
        status: dto.status ?? BlogStatus.DRAFT,
        publishedAt: dto.status === BlogStatus.PUBLISHED ? new Date() : null,
      });

      const savedPost = await manager.save(BlogPost, post);

      if (dto.images?.length) {
        const images = dto.images.map((image) =>
          manager.create(BlogImage, {
            blogPostId: savedPost.id,
            url: image.url,
            alt: image.alt ?? null,
            caption: image.caption ?? null,
            sortOrder: image.sortOrder ?? 0,
            isCover: image.isCover ?? false,
          }),
        );

        await manager.save(BlogImage, images);
      }

      return manager.findOne(BlogPost, {
        where: { id: savedPost.id },
        relations: {
          category: true,
          images: true,
        },
      });
    });
  }

  async getBlogs(query: GetBlogDto) {
    const { category, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const qb = this.blogPostRepository
      .createQueryBuilder('blog_post')
      .leftJoinAndSelect('blog_post.category', 'category')
      .where('blog_post.status = :status', {
        status: BlogStatus.PUBLISHED,
      })
      .select([
        'blog_post.id',
        'blog_post.title',
        'blog_post.slug',
        'blog_post.excerpt',
        'blog_post.thumbnail',
        'blog_post.status',
        'blog_post.createdAt',

        'category.id',
        'category.name',
        'category.slug',
      ])
      .orderBy('blog_post.createdAt', 'DESC')
      .addOrderBy('blog_post.id', 'DESC')
      .skip(skip)
      .take(limit);

    if (category) {
      qb.andWhere('category.slug = :category', {
        category,
      });
    }

    const [items, total] = await qb.getManyAndCount();

    return {
      items: items.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        thumbnail: post.thumbnail,
        status: post.status,
        createdAt: post.createdAt,
        category: post.category
          ? {
              id: post.category.id,
              name: post.category.name,
              slug: post.category.slug,
            }
          : null,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBlogDetail(slug: string) {
    const post = await this.blogPostRepository.findOne({
      where: {
        slug,
        status: BlogStatus.PUBLISHED,
      },
      relations: {
        category: true,
        images: true,
      },
      order: {
        images: {
          sortOrder: 'ASC',
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Blog not found');
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      thumbnail: post.thumbnail,
      content: post.content,
      status: post.status,
      createdAt: post.createdAt,

      category: post.category
        ? {
            id: post.category.id,
            name: post.category.name,
            slug: post.category.slug,
          }
        : null,

      images: post.images.map((image) => ({
        id: image.id,
        url: image.url,
        alt: image.alt,
        caption: image.caption,
        sortOrder: image.sortOrder,
      })),
    };
  }

  async getCategories() {
    return this.blogCategoryRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
