import {
  searchProductsService,
  searchSuggestService,
} from "@/services/searchService";
import { useQuery } from "@tanstack/react-query";

export function useSearchSuggest(keyword: string) {
  return useQuery({
    queryKey: ["search-suggest", keyword],
    queryFn: () => searchSuggestService(keyword),
    enabled: keyword.trim().length >= 2,
    staleTime: 60 * 1000,
  });
}

export const useSearchProducts = (keyword: string) =>
  useQuery({
    queryKey: ["search", keyword],
    queryFn: () => searchProductsService(keyword),
    staleTime: 60 * 1000,
  });
