import {
  fetchProduct,
  fetchProductByCategory,
} from "@/services/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts({
  categorySlug,
  initialData,
  sortBy,
  order,
}: {
  categorySlug?: string;
  initialData: any;
  sortBy?: string;
  order?: string;
}) {
  return useInfiniteQuery({
    queryKey: ["products", categorySlug, sortBy, order],
    queryFn: async ({ pageParam }) => {
      return await fetchProduct({
        slug: categorySlug,
        page: pageParam,
        limit: 15,
        sortBy,
        order,
      });
    },
    staleTime: Infinity,
    initialPageParam: 1,
    initialData:
      sortBy === "createdAt"
        ? {
            pages: [initialData],
            pageParams: [1],
          }
        : undefined,

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.pagination?.hasMore) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
  });
}
