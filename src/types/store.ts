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
  ownerId: string | null;
  items: CartItem[];
  isLoggedIn: boolean;
  // Đã merge cart server xong chưa, chỉ khi true mới cho phép sync API
  isCartReady: boolean;
  setOwnerId: (ownerId: string | null) => void;
  setItems: (items: CartItem[]) => void;

  setLoggedIn: (value: boolean) => void;

  setCartReady: (value: boolean) => void;

  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: number) => void;

  increaseQuantity: (variantId: number) => void;

  decreaseQuantity: (variantId: number) => void;
  clearCart: () => void;
  signOut: () => void;
  products: any[];
}
