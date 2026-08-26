import api from "@/lib/api";

export const createPayment = async (payosOrderCode: number) => {
  try {
    const res = await api.post(
      `http://localhost:5001/api/v1/payments/create/${payosOrderCode}`,
    );

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
