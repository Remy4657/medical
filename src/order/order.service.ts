import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductVariant } from '../product/entities/product-variant.entity';
import { CreateOrderDto } from './dto/create-order.dto';

import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { GetOrdersQueryDto } from './dto/get-orders.dto';
import { ProductImage } from '../product/entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    console.log('Creating order for user:', userId, 'with data:', dto);
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Giỏ hàng đang trống');
    }

    // Không cho cùng một variant xuất hiện nhiều lần
    const variantIds = dto.items.map((item) => item.variantId);

    if (new Set(variantIds).size !== variantIds.length) {
      throw new BadRequestException(
        'Một sản phẩm không được xuất hiện nhiều lần trong đơn hàng',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      /**
       * ============================================================
       * 1. Lấy variant + product + unit + price hiện tại
       * ============================================================
       */
      // Lấy tất cả variant trong đơn hàng
      const variants = await queryRunner.manager.find(ProductVariant, {
        where: {
          id: In(variantIds),
        },
        relations: {
          product: true,
          unit: true,
          price: true,
        },
      });

      if (variants.length !== variantIds.length) {
        const foundIds = new Set(variants.map((v) => v.id));

        const missingIds = variantIds.filter((id) => !foundIds.has(id));

        throw new NotFoundException(
          `Không tìm thấy variant: ${missingIds.join(', ')}`,
        );
      }

      /**
       * ============================================================
       * 2. Map variant để lấy nhanh
       * ============================================================
       */
      const variantMap = new Map(
        variants.map((variant) => [variant.id, variant]),
      );
      /**
       * ============================================================
       * Lấy ảnh đại diện của sản phẩm để lưu vào OrderItem
       * ============================================================
       */
      const productIds = variants.map((variant) => variant.product.id);

      const images = await queryRunner.manager.find(ProductImage, {
        relations: {
          product: true,
        },
        where: {
          product: {
            id: In(productIds),
          },
          isPrimary: true,
          sortOrder: 0,
        },
      });
      const imageMap = new Map(
        images.map((image) => [image.product.id, image.imageUrl]),
      );
      /**
       * ============================================================
       * 3. Tính tiền ở SERVER
       * ============================================================
       */
      const changedItems = [];
      let subtotal = 0;
      let discountAmount = 0;

      const orderItems: Partial<OrderItem>[] = [];

      for (const dtoItem of dto.items) {
        const variant = variantMap.get(dtoItem.variantId);

        if (!variant) {
          throw new NotFoundException(
            `Variant ${dtoItem.variantId} không tồn tại`,
          );
        }

        /**
         * ----------------------------------------------------------
         * Lấy giá hiện tại
         * ----------------------------------------------------------
         *
         * Tùy entity ProductVariant của bạn mà chỗ này có thể khác.
         *
         * Ví dụ:
         * variant.price.originalPrice
         * variant.price.salePrice
         */
        const originalPrice = Number(variant.price.originalPrice);
        const salePrice = Number(variant.price.salePrice);
        const clientSalePrice = Number(dtoItem.clientSalePrice);

        if (salePrice !== clientSalePrice) {
          changedItems.push({
            variantId: variant.id,
            productId: variant.product.id,
            productName: variant.product.name,
            sku: variant.sku,
            packageDescription: variant.packageDescription ?? null,
            image: variant.product.images?.[0]?.imageUrl ?? null,
            unit: {
              id: variant.unit.id,
              name: variant.unit.name,
              code: variant.unit.code,
            },
            price: {
              originalPrice: variant.price.originalPrice,
              salePrice: variant.price.salePrice,
            },
            quantity: dtoItem.quantity,
          });
        }

        if (salePrice <= 0) {
          throw new BadRequestException(
            `Variant ${variant.id} chưa có giá bán hợp lệ`,
          );
        }

        const quantity = dtoItem.quantity;
        const itemSubtotal = salePrice * quantity;
        const itemDiscount = (originalPrice - salePrice) * quantity;

        subtotal += itemSubtotal;
        discountAmount += Math.max(itemDiscount, 0);

        /**
         * ----------------------------------------------------------
         * Snapshot dữ liệu vào OrderItem
         * ----------------------------------------------------------
         *
         * Sau này Product đổi tên / đổi giá thì Order cũ
         * vẫn giữ nguyên thông tin.
         */
        orderItems.push({
          variant,
          productName: variant.product.name,
          image: imageMap.get(variant.product.id) ?? null,
          sku: variant.sku,
          packageDescription: variant.packageDescription ?? null,
          unitName: variant.unit.name,
          originalPrice: originalPrice.toFixed(2),
          salePrice: salePrice.toFixed(2),
          quantity,
          discountAmount: Math.max(itemDiscount, 0).toFixed(2),
          subtotal: itemSubtotal.toFixed(2),
        });
      }

      if (changedItems.length > 0) {
        throw new ConflictException({
          message: 'Giá một số sản phẩm đã thay đổi',
          items: changedItems,
        });
      }

      /**
       * ============================================================
       * 4. Tính shipping
       * ============================================================
       *
       * Demo:
       * shippingFee = 0
       *
       * Thực tế có thể gọi shipping service / tính theo tỉnh,
       * trọng lượng, voucher...
       */
      const shippingFee = subtotal >= 500000 ? 0 : 30000;

      /**
       * ============================================================
       * 5. Tính total
       * ============================================================
       */
      const totalAmount = subtotal + shippingFee;

      /**
       * ============================================================
       * 6. Tạo orderCode
       * ============================================================
       */
      const orderCode = this.generateOrderCode();
      const payosOrderCode = this.generatePayOsCode();

      /**
       * ============================================================
       * 7. Tạo Order
       * ============================================================
       */
      const order = queryRunner.manager.create(Order, {
        orderCode,
        payosOrderCode: dto.paymentMethod === 'BANK' ? payosOrderCode : null,
        user: {
          id: userId,
        } as any,

        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.UNPAID,

        paymentMethod: dto.paymentMethod,

        subtotal: subtotal.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        shippingFee: shippingFee.toFixed(2),
        totalAmount: totalAmount.toFixed(2),

        receiverName: dto.receiverName,
        receiverPhone: dto.receiverPhone,
        shippingAddress: dto.shippingAddress,
        note: dto.note ?? null,
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      /**
       * ============================================================
       * 8. Gắn Order vào OrderItem
       * ============================================================
       */
      const items = orderItems.map((item) =>
        queryRunner.manager.create(OrderItem, {
          ...item,
          order: savedOrder,
        }),
      );

      await queryRunner.manager.save(OrderItem, items);

      /**
       * ============================================================
       * 9. Commit
       * ============================================================
       */
      await queryRunner.commitTransaction();

      /**
       * Trả lại order vừa tạo
       */
      return {
        id: savedOrder.id,
        orderCode: savedOrder.orderCode,
        payosOrderCode: order.payosOrderCode,
        status: savedOrder.status,
        paymentStatus: savedOrder.paymentStatus,
        paymentMethod: savedOrder.paymentMethod,

        subtotal: savedOrder.subtotal,
        discountAmount: savedOrder.discountAmount,
        shippingFee: savedOrder.shippingFee,
        totalAmount: savedOrder.totalAmount,

        receiverName: savedOrder.receiverName,
        receiverPhone: savedOrder.receiverPhone,
        shippingAddress: savedOrder.shippingAddress,
        note: savedOrder.note,
        items,
        createdAt: savedOrder.createdAt,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private generateOrderCode(): string {
    const timestamp = Date.now();

    const random = Math.floor(1000 + Math.random() * 9000);

    return `ORD${timestamp}${random}`;
  }
  private generatePayOsCode(): number {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    return Math.floor(Number(timestamp) / 10000) + random;
  }

  async getMyOrders(userId: string, query: GetOrdersQueryDto) {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;
    const queryBuilder = this.dataSource
      .getRepository(Order)
      .createQueryBuilder('order')
      .where('order.user_id = :userId', {
        userId,
      })
      .leftJoinAndSelect('order.items', 'item');

    if (query.status !== undefined) {
      queryBuilder.andWhere('order.status = :status', {
        status: query.status,
      });
    }

    const [orders, total] = await queryBuilder
      .orderBy('order.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      orders: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getOrderDetail(orderCode: string, userId: string) {
    const order = await this.orderRepository.findOne({
      where: {
        orderCode,
        user: {
          id: userId,
        },
      },
      relations: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return order;
    // return {
    //   id: order.id,
    //   orderCode: order.orderCode,
    //   status: order.status,
    //   paymentStatus: order.paymentStatus,
    //   paymentMethod: order.paymentMethod,

    //   subtotal: order.subtotal,
    //   discountAmount: order.discountAmount,
    //   shippingFee: order.shippingFee,
    //   totalAmount: order.totalAmount,

    //   receiverName: order.receiverName,
    //   receiverPhone: order.receiverPhone,
    //   shippingAddress: order.shippingAddress,

    //   createdAt: order.createdAt,

    //   items: order.items.map((item) => ({
    //     id: item.id,
    //     variantId: item.variantId,
    //     productName: item.productName,
    //     sku: item.sku,
    //     variantName: item.variantName,
    //     image: item.image,
    //     quantity: item.quantity,
    //     originalPrice: item.originalPrice,
    //     salePrice: item.salePrice,
    //     totalPrice: item.totalPrice,
    //   })),
    // };
  }
}
