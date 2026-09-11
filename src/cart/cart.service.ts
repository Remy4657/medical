import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductVariant } from '../product/entities/product-variant.entity';
import { DataSource, Repository } from 'typeorm';
import { MergeCartItemDto } from './dto/merge-cart.dto';
import { CartItemResponse } from './interfaces/cart-item-response.interface';

@Injectable()
export class CartService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
  ) {}

  async mergeCart(userId: string, localItems: MergeCartItemDto[]) {
    return this.dataSource.transaction(async (manager) => {
      let cart = await manager.findOne(Cart, {
        where: {
          user: {
            id: userId,
          },
        },
      });

      /**
       * User chưa có cart trên DB
       * => tạo cart mới.
       */
      if (!cart) {
        cart = manager.create(Cart, {
          user: {
            id: userId,
          },
        });

        cart = await manager.save(cart);
      }

      /**
       * Lấy cart item hiện tại của user.
       */
      const dbItems = await manager.find(CartItem, {
        where: {
          cart: {
            id: cart.id,
          },
        },
        relations: {
          variant: true,
        },
      });

      /**
       * Tạo Map:
       *
       * variantId -> CartItem
       *
       * để lookup nhanh.
       */
      const dbMap = new Map<number, CartItem>();

      for (const item of dbItems) {
        dbMap.set(item.variant.id, item);
      }

      /**
       * Merge local -> DB.
       */
      for (const localItem of localItems) {
        const existing = dbMap.get(localItem.variantId);

        if (existing) {
          /**
           * Cùng variant:
           * cộng quantity.
           */
          existing.quantity += localItem.quantity;

          await manager.save(CartItem, existing);
        } else {
          /**
           * Variant chỉ tồn tại local:
           * tạo mới.
           */
          const newItem = manager.create(CartItem, {
            cart: {
              id: cart.id,
            } as any,
            variant: {
              id: localItem.variantId,
            } as any,
            quantity: localItem.quantity,
          });

          await manager.save(CartItem, newItem);
        }
      }

      /**
       * Sau khi merge xong:
       *
       * KHÔNG trả CartItem entity thô.
       *
       * Phải query lại full data.
       */
      const items = await this.getFullCartItems(cart.id, manager);

      return {
        items,
      };
    });
  }
  async updateItemQuantity(
    userId: string,
    variantId: number,
    quantity: number,
  ) {
    // 1. Tìm cart của user
    let cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
    //  Nếu quantity = 0 → xóa cart item nếu có
    const item = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },
        variant: {
          id: variantId,
        },
      },
    });
    if (quantity === 0) {
      if (item) {
        await this.cartItemRepository.remove(item);
      }

      return {
        variantId,
        quantity: 0,
      };
    }
    // 2. Nếu chưa có cart → tạo
    if (!cart) {
      cart = this.cartRepository.create({
        user: {
          id: userId,
        } as any,
      });

      cart = await this.cartRepository.save(cart);
    }

    // 3. Kiểm tra variant
    const variant = await this.variantRepository.findOne({
      where: {
        id: variantId,
      },
      // relations: {
      //   inventory: true,
      // },
    });

    if (!variant) {
      throw new NotFoundException('Variant không tồn tại');
    }

    // 4. Kiểm tra tồn kho
    // if (variant.inventory && quantity > variant.inventory.quantity) {
    //   throw new BadRequestException(
    //     `Số lượng tối đa là ${variant.inventory.quantity}`,
    //   );
    // }

    // 5. Tìm cart item
    let cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: {
          id: cart.id,
        },
        variant: {
          id: variantId,
        },
      },
    });

    // 6. Chưa có → tạo
    if (!cartItem) {
      cartItem = this.cartItemRepository.create({
        cart,
        variant,
        quantity,
      });
    } else {
      // Đã có → update
      cartItem.quantity = quantity;
    }

    await this.cartItemRepository.save(cartItem);

    return {
      id: cartItem.id,
      variantId,
      quantity: cartItem.quantity,
    };
  }

  // =========================================================
  // Tìm cart của user
  // =========================================================
  private async getUserCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!cart) {
      cart = this.cartRepository.create({
        user: {
          id: userId,
        } as any,
      });

      cart = await this.cartRepository.save(cart);
    }

    return cart;
  }
  // =========================================================
  // Lấy cart đầy đủ để trả frontend
  //
  // DB chỉ lưu:
  // cartId + variantId + quantity
  //
  // Nhưng response có đầy đủ:
  // productName
  // image
  // price
  // unit
  // ...
  // =========================================================
  private async getFullCartItems(
    cartId: number,
    manager: any,
  ): Promise<CartItemResponse[]> {
    const items = await manager
      .getRepository(CartItem)
      .createQueryBuilder('cart_item')
      .leftJoinAndSelect('cart_item.variant', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('variant.unit', 'unit')
      .leftJoinAndSelect('variant.price', 'price')
      .leftJoinAndSelect(
        'product.images',
        'images',
        'images.is_primary = :isPrimary AND images.sort_order = :sortOrder',
        {
          isPrimary: true,
          sortOrder: 0,
        },
      )
      .where('cart_item.cart_id = :cartId', { cartId })
      .orderBy('cart_item.created_at', 'DESC')

      .getMany();
    return items.map((item) => {
      const variant = item.variant;

      return {
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
        quantity: item.quantity,
      };
    });
  }

  // =========================================================
  // GET CART
  //
  // Dùng khi:
  // - user login
  // - refresh trang
  // - background revalidate
  // =========================================================

  async getCart(userId: string) {
    const cart = await this.getUserCart(userId);
    const items = await this.getFullCartItems(cart.id, this.dataSource.manager);

    return {
      items,
    };
  }
}
