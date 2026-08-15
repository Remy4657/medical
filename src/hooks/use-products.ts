import { fetchProduct } from "@/services/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts({
  categorySlug,
  initialData,
  limit,
  sortBy = "createdAt",
  order,
  brand = [],
  country = [],
  minPrice,
  maxPrice,
  isPromotion,
}: {
  categorySlug?: string;
  initialData?: any;
  limit?: number;
  sortBy?: string;
  order?: string;
  brand?: string[];
  country?: string[];
  minPrice?: number;
  maxPrice?: number;
  isPromotion?: boolean;
}) {
  console.log(
    sortBy === "createdAt" &&
      brand.length == 0 &&
      country.length == 0 &&
      !minPrice &&
      !maxPrice,
  );
  return useInfiniteQuery({
    queryKey: [
      "products",
      categorySlug,
      sortBy,
      order,
      brand,
      country,
      minPrice,
      maxPrice,
      isPromotion,
    ],
    queryFn: async ({ pageParam }) => {
      return await fetchProduct({
        slug: categorySlug,
        page: pageParam,
        limit: limit,
        sortBy,
        order,
        brand,
        country,
        minPrice,
        maxPrice,
        isPromotion,
      });
    },
    staleTime: Infinity,
    initialPageParam: 1,
    initialData:
      sortBy === "createdAt" &&
      brand.length == 0 &&
      country.length == 0 &&
      !minPrice &&
      !maxPrice
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
