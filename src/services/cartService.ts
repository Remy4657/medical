import api from "@/lib/api";

export const getCartByUserId = async () => {
  try {
    const res = await api.get(`http://localhost:5001/api/v1/cart`);

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const mergeCartOnLogin = async (localItems: any[]) => {
  try {
    const response = await api.post(`http://localhost:5001/api/v1/cart/merge`, {
      items: localItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    });

    return response.data;
  } catch (error) {
    console.error("Error merging cart:", error);
    throw error;
  }
};
