import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { NotFoundError } from 'rxjs';
import { ProductQueryDto } from './dto/query-product.dto';

@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get()
  // // @ResponseMessage('Products fetched successfully')
  // findProducts(
  //   @Query('category') category: string,
  //   @Query('page') page = '1',
  //   @Query('limit') limit = '15',
  // ) {
  //   if (category) {
  //     return this.productService.findByCategory(
  //       category,
  //       Number(page),
  //       Number(limit),
  //     );
  //   }
  //   const products = this.productService.findAll();
  //   return products;
  // }

  @Get()
  async getProducts(@Query() query: ProductQueryDto) {
    return this.productService.getProducts(query);
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
