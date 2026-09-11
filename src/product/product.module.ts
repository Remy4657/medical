import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { Country } from './entities/country.entity';
import { Brand } from './entities/brand.entity';
import { CountryService } from './country.service';
import { BrandService } from './brand.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Country, Brand]),
    CategoryModule,
  ], // đăng ký repository cho entity product
  controllers: [ProductController],
  providers: [ProductService, CountryService, BrandService],
  exports: [ProductService],
})
export class ProductModule {}
