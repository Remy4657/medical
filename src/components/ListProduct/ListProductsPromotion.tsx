"use client";
import { Flame } from "lucide-react";
import { CatalogProductCard } from "../CatalogProductCard";
import { useProducts } from "@/hooks/use-products";
import Image from "next/image";

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
  const pagination = data?.pages.flatMap((page) => page?.pagination) ?? [];
  const latestPagination = pagination[pagination.length - 1] ?? {};
  const currentPage = latestPagination.page ?? 1;
  const total = latestPagination.total ?? 0;
  const limit = latestPagination.limit ?? 0;
  const restCountProduct = total - limit * currentPage;

  return (
    <div className="flex flex-col mt-5 p-3 rounded-2xl bg-white">
      <div className="mb-5">
        <Image
          src="/img/flashsale.webp"
          alt="image"
          width={1400}
          height={120}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 rounded-2xl">
        {/* Start List Products */}
        <div className="">
          <ul className=" p-3 grid grid-cols-1 gap-2 sm:gap-4  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
  );
}
