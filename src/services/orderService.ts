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
export const getOrderByUser = async (
  orderStatus?: string | null,
  page: number = 1,
  limit: number = 2,
) => {
  try {
    //  await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      {
        params: {
          ...(orderStatus && { status: orderStatus }),
          page,
          limit,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
export const getOrderDetail = async (orderCode: string): Promise<any> => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderCode}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error;
  }
};
