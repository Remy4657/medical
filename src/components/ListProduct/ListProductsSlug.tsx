"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CatalogProductCard } from "../CatalogProductCard";
import { fetchProductByCategory } from "@/services/productService";
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import ProductFilterDesktop from "./ProductFilterDesktop";
import MobileFilterDrawer from "./MobileFilterDrawer";

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
  const [sortBy, setSortBy] = useState<undefined | string>(undefined);
  const [order, setOrder] = useState<undefined | string>(undefined);

  const handleOpenFilter = () => {
    setIsOpen(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    categorySlug,
    initialData,
    sortBy,
    order,
  });
  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const pagination = data?.pages.flatMap((page) => page.pagination) ?? [];
  const latestPagination = pagination[pagination.length - 1] ?? {};
  const currentPage = latestPagination.page ?? 1;
  const total = latestPagination.total ?? 0;
  const limit = latestPagination.limit ?? 0;
  const restCountProduct = total - limit * currentPage;

  const handleSortBestselling = () => {
    setSortBy("bestSelling");
    setOrder("asc");
  };
  const handleSortPriceAsc = () => {
    setSortBy("price");
    setOrder("asc");
  };
  const handleSortPriceDesc = () => {
    setSortBy("price");
    setOrder("desc");
  };
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
            <button
              onClick={() => handleSortBestselling()}
              className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            >
              Bán chạy
            </button>
            <button
              onClick={() => handleSortPriceAsc()}
              className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            >
              Giá tăng dần
            </button>

            <button
              onClick={() => handleSortPriceDesc()}
              className="btn focus:outline-2 focus:outline-offset-2 focus:outline-primary"
            >
              Giá giảm dần
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Desktop filter */}
          <aside className="hidden lg:block">
            <ProductFilterDesktop filters={null} setFilters={() => {}} />
          </aside>
          <div>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((p) => (
                <li key={p.id}>
                  <CatalogProductCard product={p} />
                </li>
              ))}
            </ul>
            <div className="flex m-5">
              {hasNextPage && (
                <button
                  className="btn m-auto"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Đang tải..."
                    : `Xem thêm ${restCountProduct} sản phẩm`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

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
