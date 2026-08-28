import { getCartByUserId } from "@/services/cartService";
import { createPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const usePaymentQuery = (payosOrderCode: number) =>
  useQuery({
    queryKey: ["payment", "create"],
    queryFn: async () => createPayment(payosOrderCode),
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Nếu muốn tự kiểm tra thay đổi giá định kỳ
    //refetchInterval: 1000 * 10, // 5 giây
  });
