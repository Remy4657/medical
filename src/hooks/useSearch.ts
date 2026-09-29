import {
  searchProductsService,
  searchSuggestService,
} from "@/services/searchService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useSearchSuggest(keyword: string) {
  return useQuery({
    queryKey: ["search-suggest", keyword],
    queryFn: () => searchSuggestService(keyword),
    enabled: keyword.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchProducts({
  keywordSearch,
  sortBy,
  order,
  brand = [],
  country = [],
  minPrice,
  maxPrice,
  isPromotion,
}: {
  keywordSearch: string;
  sortBy?: string;
  order?: string;
  brand?: string[];
  country?: string[];
  minPrice?: number;
  maxPrice?: number;
  isPromotion?: boolean;
}) {
  return useInfiniteQuery({
    queryKey: [
      "search-products",
      keywordSearch,
      sortBy,
      order,
      brand,
      country,
      minPrice,
      maxPrice,
      isPromotion,
    ],
    queryFn: async ({ pageParam }) => {
      return await searchProductsService({
        keywordSearch,
        page: pageParam,
        sortBy,
        order,
        brand,
        country,
        minPrice,
        maxPrice,
        isPromotion,
      });
    },
    staleTime: 5 * 60 * 1000,
    initialPageParam: 1,
    initialData: undefined,

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.pagination?.hasMore) {
        return undefined;
      }
      return lastPage.pagination.page + 1;
    },
  });
}
