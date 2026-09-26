"use client";

import { CatalogProductCard } from "../CatalogProductCard";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductFilterDesktop from "./ProductFilterDesktop";
import MobileFilterDrawer from "./MobileFilterDrawer";
import { ListFilter } from "lucide-react";

export default function ListProductsSlug({
  isSearching,
  listBrandFilter,
  listCountryFilter,
  categorySlug,
  initialData,
}: {
  isSearching?: boolean;
  listBrandFilter: any;
  listCountryFilter: any;
  categorySlug?: string;
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

  const [countFiltered, setCountFiltered] = useState(0);
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
  console.log("listProductSlug render");
  const products = data?.pages.flatMap((page) => page?.products) ?? [];
  const latestPagination = data?.pages.at(-1)?.pagination ?? {};
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
  useEffect(() => {
    console.log("sortBy changed:", sortBy);
  }, [sortBy]);

  useEffect(() => {
    console.log("order changed:", order);
  }, [order]);

  useEffect(() => {
    console.log("data changed:", data);
  }, [data]);
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr]">
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
          countFiltered={countFiltered}
          setCountFiltered={setCountFiltered}
        />
      </aside>
      {/* End Desktop filter */}

      {/* Start List Products */}
      <div>
        <div className="flex gap-3 flex-row justify-between mb-5 items-center overflow-x-auto scrollbar-hide">
          <div>
            <h2 className="text-lg text-base-content hidden md:block">
              {isSearching ? "Kết quả tìm kiếm" : "Danh sách sản phẩm"}
            </h2>
            <button
              onClick={() => handleOpenFilter()}
              className={`relative btn btn-outline d-block sm:hidden w-[110] ${countFiltered == 1 ? "text-primary border-primary" : "border-base-300"}`}
            >
              <ListFilter size={15} />
              Bộ lọc
              {countFiltered == 1 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary border-2 border-white" />
              )}
            </button>
          </div>
          <div className="flex flex-row gap-3">
            <span className="hidden lg:flex items-center ">Sắp xếp theo: </span>
            <button
              onClick={() => handleSortBestselling()}
              className={`btn btn-outline border hover:border-primary hover:text-primary px-2 ${
                sortBy === "bestSelling"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Bán chạy
            </button>
            <button
              onClick={() => handleSortPriceAsc()}
              className={`btn btn-outline border hover:border-primary hover:text-primary px-2 ${
                sortBy === "price" && order === "asc"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Giá tăng dần
            </button>

            <button
              onClick={() => handleSortPriceDesc()}
              className={`btn btn-outline border hover:border-primary hover:text-primary px-2 ${
                sortBy === "price" && order === "desc"
                  ? "border-primary text-primary"
                  : "border-base-300"
              }`}
            >
              Giá giảm dần
            </button>
          </div>
        </div>
        <h2 className="text-lg  mb-3 text-base-content block md:hidden">
          {isSearching ? "Kết quả tìm kiếm" : "Danh sách sản phẩm"}
        </h2>
        <ul className="grid gap-2 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((p) => (
              <li key={p.id}>
                <CatalogProductCard product={p} />
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">
              Không có sản phẩm nào.
            </p>
          )}
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
        countFiltered={countFiltered}
        setCountFiltered={setCountFiltered}
      />
    </div>
  );
}
