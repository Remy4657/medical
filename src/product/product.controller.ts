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
import { CountryService } from './country.service';
import { BrandService } from './brand.service';

@Controller('api/v1')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly countryService: CountryService,
    private readonly brandService: BrandService,
  ) {}

  @Get('products')
  async getProducts(@Query() query: ProductQueryDto) {
    return this.productService.getProducts(query);
  }
  @Get('products/filters')
  async getFilters() {
    const [countries, brands] = await Promise.all([
      this.countryService.getAllNames(),
      this.brandService.getAllNames(),
    ]);

    return {
      countries,
      brands,
    };
  }
  @Get('product/:slug')
  async getProductDetail(@Param('slug') slug: string) {
    return this.productService.getProductDetail(slug);
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
