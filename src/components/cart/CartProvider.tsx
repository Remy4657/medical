"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { mergeCartOnLogin } from "@/lib/cart-merge";
import { useCartStore } from "@/stores/useCartStore";

export function CartProvider() {
  const { data: session, isPending } = useSession();
  const { signOut } = useCartStore();
  const setLoggedIn = useCartStore((state) => state.setLoggedIn);
  const setCartReady = useCartStore((state) => state.setCartReady);
  const ownerId = useCartStore((state) => state.ownerId);
  const setOwnerId = useCartStore((state) => state.setOwnerId);

  useEffect(() => {
    if (isPending) {
      return;
    }
    const userId = session?.user?.id ?? null;
    /**
     * ============================
     * USER CHƯA LOGIN
     * ============================
     */
    if (!userId) {
      signOut();
      return;
    }
    /**
     * ============================
     * USER ĐÃ LOGIN
     * ============================
     */
    /**
     * CASE 1:
     *
     * ownerId === userId
     *
     * Nghĩa là cart này đã từng được
     * merge cho chính user này.
     *
     * Refresh:
     * ownerId vẫn được persist
     * => KHÔNG merge lại.
     */
    if (ownerId === userId) {
      setCartReady(true);
      setLoggedIn(true);
      return;
    }

    /**
     * CASE 2:
     *
     * ownerId === null
     *
     * Đây là guest cart.
     *
     * User vừa login => merge.
     */
    if (ownerId === null) {
      setCartReady(false);
      const merge = async () => {
        try {
          /**
           * Đây chính là:
           *
           * LOCAL CART
           *      +
           * DB CART
           *      ↓
           * MERGE
           */
          await mergeCartOnLogin();

          /**
           * Đánh dấu cart đã thuộc về
           * user này.
           *
           * Quan trọng:
           * ownerId được persist.
           */
          setOwnerId(userId);
          setLoggedIn(true);
          setCartReady(true);
        } catch (error) {
          console.error("Failed to merge cart:", error);

          /**
           * Quan trọng:
           *
           * Nếu merge thất bại,
           * KHÔNG xóa local cart.
           *
           * Và cart vẫn chưa ready
           * => không cho PATCH API.
           */
          setCartReady(false);
        }
      };
      merge();
      return;
    }
    /**
     * CASE 3:
     *
     * ownerId khác userId
     *
     * Ví dụ:
     *
     * ownerId = user A
     * session  = user B
     *
     * Không được merge cart A vào B.
     *
     * Đây là lý do logout phải clear cart.
     */
    setCartReady(false);
  }, [session, isPending, setLoggedIn, setCartReady]);

  return null;
}
