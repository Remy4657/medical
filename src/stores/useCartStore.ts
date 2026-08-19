import { CartState } from "@/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item, quantity = 1) => {
          set((state) => {
            const existingItem = state.items.find(
              (cartItem) => cartItem.variantId === item.variantId,
            );

            if (existingItem) {
              return {
                items: state.items.map((cartItem) =>
                  cartItem.variantId === item.variantId
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity,
                      }
                    : cartItem,
                ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  ...item,
                  quantity,
                },
              ],
            };
          });
        },
        removeItem: (variantId) => {
          set((state) => ({
            items: state.items.filter((item) => item.variantId !== variantId),
          }));
        },

        increaseQuantity: (variantId) => {
          set((state) => ({
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

        products: [1, 2, 3],

        count: null,

        setCount: async () => {
          const currentCount = get().count ?? 0;
          set({ count: currentCount + 1 });
        },
      }),
      {
        name: "cart-storage",
      },
    ),
    {
      name: "CartStore",
    },
  ),
);
