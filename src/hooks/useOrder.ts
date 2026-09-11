import { getOrderByUser, getOrderDetail } from "@/services/orderService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useOrderPagination = (
  orderStatus?: string | null,
  page?: number,
  limit?: number,
) =>
  useQuery({
    queryKey: ["orders", "pagination", orderStatus, page],
    queryFn: () => getOrderByUser(orderStatus, page, limit),
    placeholderData: keepPreviousData, // Giữ dữ liệu cũ khi đang tải dữ liệu mới
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
export const useDetailOrder = (orderCode: string) =>
  useQuery({
    queryKey: ["orders", orderCode],
    queryFn: () => getOrderDetail(orderCode),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
