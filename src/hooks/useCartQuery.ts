import { getCartByUserId } from "@/services/cartService";
import { useQuery } from "@tanstack/react-query";

export const useCartQuery = (isLoggedIn: boolean) =>
  useQuery({
    queryKey: ["cart"],
    queryFn: getCartByUserId,
    enabled: isLoggedIn, // Chỉ thực hiện query khi người dùng đã đăng nhập, nếu chưa đăng nhập thì không thực hiện query
    staleTime: 1000 * 15,
    refetchOnWindowFocus: false, // Nếu muốn tự kiểm tra thay đổi khi focus vào tab
    refetchOnReconnect: false, // Nếu muốn tự kiểm tra thay đổi khi kết nối lại
    // Nếu muốn tự kiểm tra thay đổi giá định kỳ
    //refetchInterval: 1000 * 10, // 5 giây
  });
