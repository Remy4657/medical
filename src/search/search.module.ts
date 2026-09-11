import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchController } from './search.controller';
import { SearchService } from './search.service';

import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { SearchKeyword } from './entities/search.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchKeyword, Product, Category])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
