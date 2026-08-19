export interface CartItem {
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

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: number) => void;

  increaseQuantity: (variantId: number) => void;

  decreaseQuantity: (variantId: number) => void;
  products: any[];
  count: number | null;
  setCount: () => Promise<void>;
}
