import api from "@/lib/api";

export const getCartByUserId = async () => {
  try {
    const res = await api.get(`/cart`);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const mergeCartOnLoginService = async (localItems: any[]) => {
  try {
    const res = await api.post(`/cart/merge`, {
      items: localItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    });

    return res.data.data;
  } catch (error) {
    console.error("Error merging cart:", error);
    throw error;
  }
};
export const syncCartService = async (
  variantId: number,
  quantityToSync: number,
) => {
  try {
    await api.patch(`/cart/items/${variantId}`, {
      quantity: quantityToSync,
    });
  } catch (error) {
    console.error("Error merging cart:", error);
    throw error;
  }
};
