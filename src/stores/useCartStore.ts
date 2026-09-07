import { CartState } from "@/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        ownerId: null,
        isLoggedIn: false,
        isCartReady: false,
        items: [],

        setOwnerId: (ownerId) => {
          set({ ownerId });
        },

        setLoggedIn: (value) => {
          set({
            isLoggedIn: value,
          });
        },
        setCartReady: (value) => {
          set({
            isCartReady: value,
          });
        },
        setItems: (items) => {
          set({ items });
        },
        addItem: async (item, quantity = 1) => {
          const previousItems = get().items;

          const existingItem = get().items.find(
            (cartItem) => cartItem.variantId === item.variantId,
          );
          try {
            let newQuantity = existingItem
              ? existingItem.quantity + quantity
              : quantity;
            if (existingItem) {
              set((state) => ({
                // tìm kiếm item được click thêm vào giỏ thì tăng quantity lên 1, còn lại giữ nguyên
                items: state.items.map((cartItem) =>
                  cartItem.variantId === item.variantId
                    ? {
                        ...cartItem,
                        quantity: newQuantity,
                      }
                    : cartItem,
                ),
              }));
            } else {
              set((state) => ({
                items: [
                  ...state.items,
                  {
                    ...item,
                    quantity: newQuantity,
                  },
                ],
              }));
            }
          } catch (error) {
            console.error("Error adding item to cart:", error);
            set({ items: previousItems });
          }
        },
        removeItem: (variantId) => {
          set((state) => ({
            items: state.items.filter((item) => item.variantId !== variantId),
          }));
        },

        increaseQuantity: async (variantId) => {
          set((state) => ({
            // tìm kiếm item được click tăng thì tăng quantity lên 1, còn lại giữ nguyên
            items: state.items.map((item) =>
              item.variantId === variantId
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          }));
        },

        decreaseQuantity: (variantId) => {
          set((state) => ({
            items: state.items
              .map((item) =>
                item.variantId === variantId
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                    }
                  : item,
              )
              .filter((item) => item.quantity > 0),
          }));
        },
        clearCart: () => {
          set({ items: [] });
        },
        signOut: () => {
          set({
            ownerId: null,
            isLoggedIn: false,
            isCartReady: false,
            items: [],
          });
        },
        products: [1, 2, 3],
      }),
      {
        name: "cart-store",
        partialize: (state) => ({
          items: state.items,
          ownerId: state.ownerId,
        }),
      },
    ),
    {
      name: "CartStore",
    },
  ),
);
