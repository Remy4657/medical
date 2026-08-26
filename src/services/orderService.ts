import api from "@/lib/api";

export const createOrder = async (orderData: any) => {
  try {
    const response = await api.post(
      `http://localhost:5001/api/v1/orders`,
      orderData,
    );

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
