import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { PayOSService } from './payos.service';

@Controller('api/v1/payments')
export class PayOSController {
  constructor(private readonly payOSService: PayOSService) {}

  /**
   * Tạo QR payment
   *
   * POST /api/v1/payments/create/:orderId
   */
  @Post('create/:payosOrderCode')
  async createPayment(
    @Param('payosOrderCode', ParseIntPipe) payosOrderCode: number,
  ) {
    return this.payOSService.createPayment(payosOrderCode);
  }

  /**
   * Poll trạng thái payment
   *
   * GET /api/v1/payments/status/:orderCode
   * dùng khi user đã quét QR nhưng chưa thanh toán xong, để check xem đã thanh toán chưa.
   * orderCode là order.id
   * cái này thay thế bằng webhook, nhưng webhook có thể bị delay, nên vẫn cần cái này để check trạng thái payment.
   */
  @Get('status/:orderCode')
  async getPaymentStatus(@Param('orderCode', ParseIntPipe) orderCode: number) {
    return this.payOSService.getPaymentStatus(orderCode);
  }

  /**
   * PayOS webhook
   *
   * POST /api/v1/payments/webhook
   * tự động nghe webhook từ PayOS, không cần user gửi request.
   */

  @Post('webhook')
  async webhook(@Body() body: any) {
    return this.payOSService.handleWebhook(body);
  }
}
