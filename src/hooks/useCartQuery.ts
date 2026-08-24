import { getCartByUserId } from "@/services/cartService";
import { useQuery } from "@tanstack/react-query";

export const useCartQuery = (isLoggedIn: boolean) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getCartByUserId,
    enabled: isLoggedIn,
    staleTime: 1000 * 5,
    //refetchOnWindowFocus: true,

    // Nếu muốn tự kiểm tra thay đổi giá định kỳ
    //refetchInterval: 1000 * 10, // 5 giây
  });
