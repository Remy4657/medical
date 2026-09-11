"use client";

import { authClient } from "@/lib/auth-client";
import { scheduleCartSync } from "@/lib/cart-sync";
import { getCartByUserId } from "@/services/cartService";
import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "@/types/store";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  const addItemStore = useCartStore((state) => state.addItem);
  const increaseStore = useCartStore((state) => state.increaseQuantity);
  const decreaseStore = useCartStore((state) => state.decreaseQuantity);
  const removeStore = useCartStore((state) => state.removeItem);
  const signOutStore = useCartStore((state) => state.signOut);

  /**
   * Guest:
   * scheduleCartSync return ngay.
   *
   * Logged:
   * debounce -> API.
   */
  const addToCart = (item: Omit<CartItem, "quantity">, quantity?: number) => {
    addItemStore(item, quantity);
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

  const signOut = async () => {
    await authClient.signOut();
    signOutStore();
  };

  return {
    addToCart,
    increase,
    decrease,
    remove,
    signOut,
  };
}

export const useCartQuery = (isLoggedIn: boolean) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getCartByUserId,
    enabled: isLoggedIn, // Chỉ thực hiện query khi người dùng đã đăng nhập, nếu chưa đăng nhập thì không thực hiện query
    staleTime: 1000 * 15,
    refetchOnWindowFocus: false, // Nếu muốn tự kiểm tra thay đổi khi focus vào tab
    refetchOnReconnect: false, // Nếu muốn tự kiểm tra thay đổi khi kết nối lại
    // Nếu muốn tự kiểm tra thay đổi giá định kỳ
    //refetchInterval: 1000 * 10, // 5 giây
  });
