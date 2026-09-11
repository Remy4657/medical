import { createPayment } from "@/services/paymentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useQueryPayment = (payosOrderCode: number) =>
  useQuery({
    queryKey: ["payment", "create"],
    queryFn: async () => createPayment(payosOrderCode),
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (payosOrderCode: number) => createPayment(payosOrderCode),
  });
};
