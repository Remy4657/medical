import api from "@/lib/api";

export const createPayment = async (payosOrderCode: number) => {
  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/create/${payosOrderCode}`,
    );

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
