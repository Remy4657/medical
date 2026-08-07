import {
  fetchProduct,
  fetchProductByCategory,
} from "@/services/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts({
  categorySlug,
  initialData,
  sortBy = "createdAt",
  order,
  brand = [],
  country = [],
  minPrice,
  maxPrice,
}: {
  categorySlug?: string;
  initialData: any;
  sortBy?: string;
  order?: string;
  brand: string[];
  country: string[];
  minPrice?: number;
  maxPrice?: number;
}) {
  console.log("sortby: ", sortBy);
  console.log("brand: ", brand);
  console.log("minPrice: ", minPrice);
  console.log("maxPrice: ", maxPrice);
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
    ],
    queryFn: async ({ pageParam }) => {
      return await fetchProduct({
        slug: categorySlug,
        page: pageParam,
        limit: 15,
        sortBy,
        order,
        brand,
        country,
        minPrice,
        maxPrice,
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
