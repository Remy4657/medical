"use client";

import { initializeCartSync } from "@/lib/cart-sync";
import { useCartStore } from "@/stores/useCartStore";
import api from "./api";
import { mergeCartOnLoginService } from "@/services/cartService";

export async function mergeCartOnLogin() {
  const store = useCartStore.getState();

  /**
   * Cart guest hiện đang nằm trong Zustand.
   *
   * Ví dụ:
   *
   * [
   *   { variantId: 10, quantity: 2 },
   *   { variantId: 20, quantity: 1 }
   * ]
   */
  const localItems = store.items ?? [];
  const { items } = await mergeCartOnLoginService(localItems);

  /**
   * Server trả cart cuối cùng.
   *
   * Ví dụ:
   *
   * Local:
   * A = 2
   * B = 1
   *
   * DB:
   * A = 3
   * C = 5
   *
   * Backend merge:
   * A = 5
   * B = 1
   * C = 5
   */

  /**
   * Quan trọng:
   *
   * Trước tiên cập nhật Zustand bằng
   * kết quả SERVER.
   */
  store.setItems(items);

  /**
   * Đánh dấu những quantity này là
   * quantity server đã xác nhận.
   *
   * Đây chính là base để rollback.
   */
  initializeCartSync(items);

  /**
   * Bây giờ logged-in cart mới sẵn sàng
   * cho add / increase / decrease / remove.
   */

  return items;
}
