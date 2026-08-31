import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayOS } from '@payos/node';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class PayOSService {
  constructor(
    private readonly payOS: PayOS,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Tạo payment QR cho Order
   */
  async createPayment(payosOrderCode: number) {
    console.log('payosOrderCode: ', payosOrderCode);
    const order = await this.orderRepository.findOne({
      where: {
        payosOrderCode: payosOrderCode,
      },
      relations: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order không tồn tại');
    }

    /**
     * Không cho tạo payment lần nữa nếu đã thanh toán
     */
    if (order.paymentStatus === 'PAID') {
      throw new BadRequestException('Order đã được thanh toán');
    }

    /**
     * Dùng order.totalAmount được backend tính từ DB.
     *
     * KHÔNG lấy amount từ frontend.
     */
    const amount = Number(order.totalAmount);

    if (!Number.isInteger(amount) || amount <= 0) {
      throw new BadRequestException('Số tiền thanh toán không hợp lệ');
    }

    /**
     * PayOS orderCode phải là số nguyên.
     *
     * Nếu order.id là unique thì có thể dùng trực tiếp.
     */

    const frontendUrl = process.env.NEXT_PUBLIC_APP_URL;

    try {
      const expiredAt = Math.floor(Date.now() / 1000) + 15 * 60;
      const paymentLink = await this.payOS.paymentRequests.create({
        orderCode: payosOrderCode,
        amount,
        description: `DH${order.id}`,

        // items:
        //   order.items?.map((item) => ({
        //     name: item.productName,
        //     quantity: item.quantity,
        //     price: Number(item.salePrice),
        //   })) ?? [],

        returnUrl: `${frontendUrl}/dat-hang/success`,
        cancelUrl: `${frontendUrl}/dat-hang/cancel`,
        //expiredAt,
      });

      /**
       * Lưu thông tin PayOS vào Order
       */
      await this.orderRepository.update(order.id, {
        payosPaymentLinkId: paymentLink.paymentLinkId,
      });

      return {
        payosOrderCode: order.payosOrderCode,
        amount,
        status: paymentLink.status,
        qrCode: paymentLink.qrCode,
        checkoutUrl: paymentLink.checkoutUrl,
        paymentLinkId: paymentLink.paymentLinkId,
        expiredAt,
      };
    } catch (error) {
      console.error('PayOS create payment error:', error);
      throw new InternalServerErrorException('Không thể tạo thanh toán PayOS');
    }
  }

  /**
   * Kiểm tra trạng thái payment trực tiếp từ PayOS
   *
   * Dùng làm fallback khi webhook chưa cập nhật kịp.
   */
  async getPaymentStatus(orderCode: number) {
    try {
      const payment = await this.payOS.paymentRequests.get(orderCode);

      return {
        orderCode: payment.orderCode,
        amount: payment.amount,
        amountPaid: payment.amountPaid,
        amountRemaining: payment.amountRemaining,
        status: payment.status,
      };
    } catch (error) {
      console.error('PayOS get payment status error:', error);

      throw new InternalServerErrorException(
        'Không thể lấy trạng thái thanh toán',
      );
    }
  }

  /**
   * Xử lý webhook PayOS
   */
  async handleWebhook(body: any) {
    /**
     * Verify chữ ký do PayOS gửi
     */
    const webhookData = await this.payOS.webhooks.verify(body);
    console.log('webhookData', webhookData);

    const order = await this.orderRepository.findOne({
      where: {
        payosOrderCode: webhookData.orderCode,
      },
    });

    /**
     * PayOS có thể gửi webhook cho transaction
     * mà order ở hệ thống mình không tồn tại.
     */
    if (!order) {
      return {
        success: true,
      };
    }

    /**
     * Webhook success
     */
    if (webhookData.code === '00') {
      /**
       * Idempotency:
       *
       * PayOS có thể gửi lại webhook.
       * Không xử lý thanh toán lần 2.
       */
      if (order.paymentStatus !== 'PAID') {
        /**
         * Kiểm tra amount lần nữa
         */
        if (Number(webhookData.amount) !== Number(order.totalAmount)) {
          throw new BadRequestException('Số tiền webhook không khớp Order');
        }

        await this.orderRepository.update(order.id, {
          // Cast to any to satisfy TypeORM partial update typing for enum/union fields
          paymentStatus: 'PAID' as any,
          payosReference: webhookData.reference,
          // Use transactionDateTime from webhook if available, otherwise fallback to now
          paidAt: webhookData.transactionDateTime
            ? new Date(webhookData.transactionDateTime)
            : new Date(),
        });
      }
    }

    /**
     * Trả 2xx để PayOS biết webhook đã được nhận.
     */
    return {
      success: true,
    };
  }
}
