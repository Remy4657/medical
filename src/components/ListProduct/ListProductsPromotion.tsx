"use client";
import { Flame } from "lucide-react";
import { CatalogProductCard } from "../CatalogProductCard";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import Countdown from "../Countdown";

export default function ListProductsPromotion({
  listProducts,
}: {
  listProducts: any;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    initialData: listProducts,
    isPromotion: true,
    limit: 18,
  });

  const products = data?.pages.flatMap((page) => page?.products) ?? [];
  const latestPagination = data?.pages.at(-1)?.pagination ?? {};

  const currentPage = latestPagination.page ?? 1;
  const total = latestPagination.total ?? 0;
  const limit = latestPagination.limit ?? 0;
  const restCountProduct = total - limit * currentPage;

  return (
    <div className="flex flex-col sm:mt-5 p-3 rounded-none sm:rounded-2xl bg-white -mx-4 sm:mx-0">
      <div className="mb-5 -mx-3">
        <Image
          src="/img/flashsale.webp"
          alt="image"
          width={1400}
          height={120}
        />
      </div>
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab tab-active text-red-500 text-lg font-bold"
          aria-label="Đang diễn ra"
        />
        <div className="tab-content mt-5">
          <Countdown />
          <div className="grid grid-cols-1 gap-6 rounded-none sm:rounded-2xl">
            {/* Start List Products */}
            <div className="">
              <ul className=" grid grid-cols-1 gap-2 sm:gap-4  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
          </div>
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          className="tab text-lg font-bold"
          aria-label="Sắp diễn ra"
          disabled={true}
        />
        <div className="tab-content mt-5"></div>
      </div>
    </div>
  );
}
