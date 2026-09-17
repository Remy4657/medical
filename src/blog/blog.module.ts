import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogPost } from './entities/blog-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogImage } from './entities/blog-image.entity';
import { BlogCategory } from './entities/blog-category.entity';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [TypeOrmModule.forFeature([BlogPost, BlogCategory, BlogImage])],
})
export class BlogModule {}
