"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { mergeCartOnLogin } from "@/lib/cart-merge";
import { useCartStore } from "@/stores/useCartStore";
import { CartSync } from "@/lib/cart-sync";
import { useCart } from "@/hooks/useCart";

export function CartProvider() {
  const { data: session, isPending } = useSession();
  const { signOut } = useCart();
  const setLoggedIn = useCartStore((state) => state.setLoggedIn);
  const setCartReady = useCartStore((state) => state.setCartReady);
  const ownerId = useCartStore((state) => state.ownerId);
  const setOwnerId = useCartStore((state) => state.setOwnerId);

  const [isDomLoaded, setIsDomLoaded] = useState(false);

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
    // if (!userId) {
    //   signOut();
    //   return;
    // }
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
      setIsDomLoaded(true);

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
          await mergeCartOnLogin();
          setOwnerId(userId);
          setLoggedIn(true);
          setCartReady(true);
        } catch (error) {
          console.error("Failed to merge cart:", error);
          // không cho PATCH API.
          setCartReady(false);
        }
      };
      merge();
      setIsDomLoaded(true);

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
    //signOut();
    setCartReady(false);
  }, [session, isPending, setLoggedIn, setCartReady]);

  if (!isDomLoaded) {
    return;
  }
  return (
    <>
      <CartSync isLoggedIn={!!session?.user} />;
    </>
  );
}
