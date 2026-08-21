"use client";

import { scheduleCartSync } from "@/lib/cart-sync";
import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "@/types/store";

export function useCart() {
  const addItemStore = useCartStore((state) => state.addItem);
  const increaseStore = useCartStore((state) => state.increaseQuantity);
  const decreaseStore = useCartStore((state) => state.decreaseQuantity);
  const removeStore = useCartStore((state) => state.removeItem);

  const addToCart = (item: CartItem, quantity = 1) => {
    addItemStore(item, quantity);
    /**
     * Guest:
     * scheduleCartSync return ngay.
     *
     * Logged:
     * debounce -> API.
     */
    scheduleCartSync(item.variantId);
  };

  const increase = (variantId: number) => {
    increaseStore(variantId);
    scheduleCartSync(variantId);
  };

  const decrease = (variantId: number) => {
    decreaseStore(variantId);
    scheduleCartSync(variantId);
  };

  const remove = (variantId: number) => {
    removeStore(variantId);
    scheduleCartSync(variantId);
  };

  return {
    addToCart,
    increase,
    decrease,
    remove,
  };
}
