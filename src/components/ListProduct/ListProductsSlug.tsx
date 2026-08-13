"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CatalogProductCard } from "../CatalogProductCard";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/use-products";
import ProductFilterDesktop from "./ProductFilterDesktop";
import MobileFilterDrawer from "./MobileFilterDrawer";

export default function ListProductsSlug({
  listBrandFilter,
  listCountryFilter,
  categorySlug,
  categoryName,
  initialData,
}: {
  listBrandFilter: any;
  listCountryFilter: any;
  categorySlug: string;
  categoryName?: string;
  initialData: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<undefined | string>(undefined);
  const [order, setOrder] = useState<undefined | string>(undefined);
  const [listBrandFilterSelected, setListBrandFilterSelected] = useState<
    string[]
  >([]);
  const [listCountryFilterSelected, setListCountryFilterSelected] = useState<
    string[]
  >([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const handleOpenFilter = () => {
    setIsOpen(true);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    categorySlug,
    initialData,
    sortBy,
    order,
    brand: listBrandFilterSelected,
    country: listCountryFilterSelected,
    minPrice,
    maxPrice,
  });
  const products = data?.pages.flatMap((page) => page?.products) ?? [];
  const pagination = data?.pages.flatMap((page) => page?.pagination) ?? [];
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr]">
      {/* Start Desktop filter */}
      <aside className="hidden sm:block">
        <ProductFilterDesktop
          listBrandFilter={listBrandFilter}
          listCountryFilter={listCountryFilter}
          listCountryFilterSelected={listCountryFilterSelected}
          listBrandFilterSelected={listBrandFilterSelected}
          setListCountryFilterSelected={setListCountryFilterSelected}
          setListBrandFilterSelected={setListBrandFilterSelected}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </aside>
      {/* End Desktop filter */}

      {/* Start List Products */}
      <div>
        <div className="flex flex-row justify-between mb-5 items-center">
          <div>
            <h2 className="text-lg text-base-content">Danh sách sản phẩm</h2>
          </div>
          <div className="flex flex-row gap-2 justify-end">
            <span className="hidden lg:flex items-center ">Sắp xếp theo: </span>
            <button
              onClick={() => handleOpenFilter()}
              className="btn btn-outline sm:hidden"
            >
              Bộ lọc
            </button>
            <button
              onClick={() => handleSortBestselling()}
              className={`btn border hover:border-primary hover:text-primary ${
                sortBy === "bestSelling"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Bán chạy
            </button>
            <button
              onClick={() => handleSortPriceAsc()}
              className={`btn border hover:border-primary hover:text-primary ${
                sortBy === "price" && order === "asc"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Giá tăng dần
            </button>

            <button
              onClick={() => handleSortPriceDesc()}
              className={`btn border hover:border-primary hover:text-primary ${
                sortBy === "price" && order === "desc"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Giá giảm dần
            </button>
          </div>
        </div>
        <ul className="grid gap-2 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
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
      {/* End List Products */}
      {/* Mobile filter */}
      <MobileFilterDrawer
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        listBrandFilter={listBrandFilter}
        listCountryFilter={listCountryFilter}
        listCountryFilterSelected={listCountryFilterSelected}
        listBrandFilterSelected={listBrandFilterSelected}
        setListCountryFilterSelected={setListCountryFilterSelected}
        setListBrandFilterSelected={setListBrandFilterSelected}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
      />
    </div>
  );
}
