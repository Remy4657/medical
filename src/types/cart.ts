export type ServerCartItem = {
  id: number;
  variantId: number;
  quantity: number;
};

export type MergeCartResponse = {
  items: ServerCartItem[];
};
