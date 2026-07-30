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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get('/')
  // async findAll() {
  //   console.log('hi');
  //   const products = await this.productService.findAll();
  //   return {
  //     products: products.map((p) => ({
  //       ...p,
  //       category: p.category?.name,
  //     })),
  //   };
  // }
  @Get()
  findProducts(@Query('category') category?: string) {
    if (category) {
      return this.productService.findByCategory(category);
    }
    const products = this.productService.findAll();
    return products;
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
