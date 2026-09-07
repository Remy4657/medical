import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUserId } from '../auth/current-user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { GetOrdersQueryDto } from './dto/get-orders.dto';

@Controller('api/v1/orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @CurrentUserId() userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(userId, dto);
  }

  /**
   * GET /orders?page=1&limit=10
   *
   * Lấy danh sách order của user hiện tại
   */
  @Get()
  async getMyOrders(
    @CurrentUserId() userId: string,
    @Query() query: GetOrdersQueryDto,
  ) {
    return this.orderService.getMyOrders(userId, query);
  }
  @Get(':orderCode')
  async getOrderDetail(
    @Param('orderCode') orderCode: string,
    @CurrentUserId() userId: string,
  ) {
    return this.orderService.getOrderDetail(orderCode, userId);
  }
}
