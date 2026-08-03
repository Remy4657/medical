"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CatalogProductCard } from "../CatalogProductCard";
import { fetchProductByCategory } from "@/services/productService";
import ProductFilterDesktop from "./ProductFilterDesktop";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { useState } from "react";

export default function ProductList({
  categorySlug,
  categoryName,
  initialData,
}: {
  categorySlug: string;
  categoryName: string;
  initialData: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenFilter = () => {
    setIsOpen(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products", categorySlug],
      queryFn: async ({ pageParam }) => {
        return await fetchProductByCategory(categorySlug, pageParam, 15);
      },
      staleTime: Infinity,
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },

      getNextPageParam: (lastPage, pages) => {
        if (!lastPage?.pagination?.hasMore) {
          return undefined;
        }
        return lastPage.pagination.page + 1;
      },
    });
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="space-y-12">
      <section id="catolag" className="scroll-mt-24">
        <div className="mb-6 flex flex-row gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content md:text-2xl uppercase font-mono">
              {categoryName}
            </h2>
          </div>
          <div className="flex flex-row gap-2">
            <span className="hidden lg:flex items-center ">Sắp xếp theo: </span>
            <button
              onClick={() => handleOpenFilter()}
              className="btn btn-outline lg:hidden"
            >
              Bộ lọc
            </button>
            <button className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary">
              Bán chạy
            </button>
            <button className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary">
              Giá tăng dần
            </button>
            <button className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary">
              Giá giảm dần
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Desktop filter */}
          <aside className="hidden lg:block">
            <ProductFilterDesktop filters={null} setFilters={() => {}} />
          </aside>
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p) => (
              <li key={p.id}>
                <CatalogProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
        </button>
      )}

      {/* Mobile filter */}
      <MobileFilterDrawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        filters={null}
        setFilters={() => {}}
      />
    </div>
  );
}
