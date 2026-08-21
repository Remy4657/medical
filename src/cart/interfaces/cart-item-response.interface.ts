// cart/interfaces/cart-item-response.interface.ts

export interface CartItemResponse {
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
}
