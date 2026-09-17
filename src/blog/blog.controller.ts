import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { GetBlogDto } from './dto/get-blog.dto';

@Controller('api/v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('categories')
  getCategories() {
    return this.blogService.getCategories();
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }
  @Get()
  getBlogs(@Query() query: GetBlogDto) {
    return this.blogService.getBlogs(query);
  }

  @Get(':slug')
  getBlogDetail(@Param('slug') slug: string) {
    return this.blogService.getBlogDetail(slug);
  }
}
