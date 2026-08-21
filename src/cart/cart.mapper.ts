import { CartItem } from './entities/cart-item.entity';

export function mapCartItem(item: CartItem): {
  variantId: number;
  productId: number;
  productName: string;
  sku: string;
  packageDescription: string | null;
  image: string | null;

  unit: {
    id: number;
    name: string;
    code: string;
  };

  price: {
    originalPrice: string;
    salePrice: string;
  };

  quantity: number;
} {
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
}
