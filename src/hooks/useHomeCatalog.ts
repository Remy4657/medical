"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CategoriesResponse, ProductsResponse } from "@/types";

export const useHomeCatalog = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get("category")?.trim() ?? "";

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // const { data: categoriesData, isLoading: loadingCategories } =
  //   useQuery<CategoriesResponse>({
  //     queryKey: ["product-categories"],
  //     queryFn: () => getAllCategories(),
  //   });

  // const {
  //   data: productsData,
  //   isLoading: loadingList,
  //   error,
  // } = useQuery<ProductsResponse>({
  //   queryKey: ["products", categoryFilter],
  //   queryFn: () => getAllProducts(),
  // });

  // const categories = categoriesData?.categories ?? [];
  // const products = productsData?.products ?? [];

  // const categoryChipsLoading = loadingCategories && categories.length === 0;

  return {
    categoryFilter,
    setCategory,
    // categories,
    // products,
    // categoryChipsLoading,
    // loadingCategories,
    // loadingList,
    // error,
  };
};
