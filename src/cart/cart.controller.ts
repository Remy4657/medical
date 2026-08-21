import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../auth/entities/user.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CurrentUserId } from '../auth/current-user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { MergeCartDto } from './dto/merge-cart.dto';

@Controller('api/v1/cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('merge')
  async mergeCart(@CurrentUserId() userId: string, @Body() dto: MergeCartDto) {
    return this.cartService.mergeCart(userId, dto.items);
  }

  @Patch('items/:variantId')
  async updateItemQuantity(
    @CurrentUserId() userId: string,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItemQuantity(userId, variantId, dto.quantity);
  }
}
