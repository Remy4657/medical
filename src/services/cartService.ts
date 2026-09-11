import api from "@/lib/api";

export const getCartByUserId = async () => {
  try {
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const mergeCartOnLoginService = async (localItems: any[]) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/merge`,
      {
        items: localItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    );

    return response.data.data;
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
    await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/items/${variantId}`,
      {
        quantity: quantityToSync,
      },
    );
  } catch (error) {
    console.error("Error merging cart:", error);
    throw error;
  }
};
