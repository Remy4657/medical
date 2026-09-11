"use client";
import OrderCard from "@/components/OrderCard";
import { OrderSkeleton } from "@/components/skeleton/OrderSkeleton";
import { OrderStatus } from "@/constants";
import { useOrderPagination } from "@/hooks/useOrder";
import { getOrderByUser } from "@/services/orderService";

import { useQueryClient } from "@tanstack/react-query";
import {
  UserRound,
  Package,
  MapPin,
  Syringe,
  FileText,
  FilePlus2,
  LogOut,
  ChevronRight,
  Search,
  Box,
  Plane,
} from "lucide-react";
import { useEffect, useState } from "react";

const tabs = ["Tất cả", "Đang xử lý", "Đã giao"];

export default function MyOrdersPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const { data, isPending, isLoading, isPlaceholderData, isFetching } =
    useOrderPagination(orderStatus, page);

  const hasNextPage = data?.pagination.hasNextPage ?? true;

  useEffect(() => {
    if (!hasNextPage) return;
    queryClient.prefetchQuery({
      queryKey: ["orders", "pagination", orderStatus, page + 1],
      queryFn: () => getOrderByUser(orderStatus, page + 1),
      staleTime: Infinity,
    });
  }, [page, queryClient, hasNextPage]);

  return (
    <main className="min-w-0">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="text-[24px] font-bold">Đơn hàng của tôi</h1>

        {/* Search */}
        {/* <div className="relative w-full xl:max-w-[620]">
          <input
            type="text"
            placeholder="Tìm theo tên đơn, mã đơn, hoặc tên sản phẩm..."
            className="input h-[56] w-full rounded-full border-0 bg-[#dfe4ea] pl-5 pr-16 text-[16px] text-[#17335d] outline-none placeholder:text-[#6c7d94] focus:bg-[#d9dfe6] focus:outline-none"
          />

          <button
            type="button"
            className="absolute right-1 top-2 flex h-[40] w-[40] items-center justify-center rounded-full text-[#1456d9] transition hover:bg-[#a9bff9]"
          >
            <Search size={20} strokeWidth={2} />
          </button>
        </div> */}
      </div>

      {/* ================= TABS ================= */}
      <div className="mb-5 flex gap-7">
        {tabs.map((tab) => {
          const active =
            (tab === "Tất cả" && orderStatus === null) ||
            (tab === "Đang xử lý" && orderStatus === OrderStatus.PENDING) ||
            (tab === "Đã giao" && orderStatus === OrderStatus.COMPLETED);

          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setPage(1);

                if (tab === "Đang xử lý") {
                  setOrderStatus(OrderStatus.PENDING);
                } else if (tab === "Đã giao") {
                  setOrderStatus(OrderStatus.COMPLETED);
                } else {
                  setOrderStatus(null);
                }
              }}
              className={[
                "relative pb-3 text-[15px] font-medium transition-colors",
                active
                  ? "text-[#1760e9]"
                  : "text-[#61748e] hover:text-[#1760e9]",
              ].join(" ")}
            >
              {tab}

              {active && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-[#1760e9]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= CONTENT ================= */}
      <div>
        {isPending ? (
          <OrderSkeleton />
        ) : data?.orders?.length ? (
          <>
            {/* Order list */}
            <div className="space-y-4">
              {data.orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="mt-5 flex justify-center">
              <div className="join ">
                <button
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                  }}
                  disabled={page === 1}
                  className={`join-item btn ${page !== 1 ? "text-primary" : "text-gray"}`}
                >
                  «
                </button>
                <button className="join-item btn text-primary">
                  Trang {page}
                </button>
                <button
                  onClick={() => {
                    setPage((p) => p + 1);
                  }}
                  className={`join-item btn ${hasNextPage ? "text-primary" : "text-gray"}`}
                  disabled={isFetching || !hasNextPage}
                >
                  »
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ================= EMPTY ================= */
          <section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#dce2e9] bg-white px-5 py-12">
            {/* Illustration */}
            <div className="relative mb-6 h-[170px] w-[250px]">
              {/* Shadow */}
              <div className="absolute bottom-1 left-1/2 h-[32px] w-[205px] -translate-x-1/2 rounded-[50%] bg-[#e5e9ef]" />

              {/* Flying plane */}
              <div className="absolute right-[70px] top-0 rotate-[25deg]">
                <Plane
                  size={27}
                  strokeWidth={1.4}
                  className="fill-[#d7dde5] text-[#b8c1cf]"
                />
              </div>

              {/* Dotted path */}
              <svg
                className="absolute right-[68px] top-[19px]"
                width="62"
                height="115"
                viewBox="0 0 65 120"
                fill="none"
              >
                <path
                  d="M18 0C51 17 55 49 38 66C23 81 6 73 5 88C4 101 20 109 31 116"
                  stroke="#cbd2dc"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* Box */}
              <div className="absolute bottom-[27px] left-1/2 h-[70px] w-[100px] -translate-x-1/2">
                {/* Top */}
                <div className="absolute left-[5px] top-0 h-[39px] w-[91px] skew-x-[28deg] rounded-sm bg-[#d2d8e1]" />

                {/* Front */}
                <div className="absolute bottom-0 left-[19px] h-[46px] w-[68px] bg-[#e0e4ea]">
                  <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#c9d0da]" />
                </div>

                {/* Left flap */}
                <div className="absolute left-0 top-[4px] h-[33px] w-[46px] -skew-y-[22deg] bg-[#cbd2dc]" />

                {/* Right flap */}
                <div className="absolute right-0 top-[4px] h-[33px] w-[46px] skew-y-[22deg] bg-[#d7dce4]" />
              </div>
            </div>

            <h2 className="text-center text-[20px] font-bold text-[#344b69]">
              Bạn chưa có đơn hàng nào
            </h2>

            <p className="mt-2 max-w-[460] text-center text-[15px] leading-6 text-[#718198]">
              Cùng khám phá hàng ngàn sản phẩm
              <br className="hidden sm:block" />
              tại Nhà thuốc FPT Long Châu nhé!
            </p>

            <button
              type="button"
              className="
            mt-5
            h-[48px]
            rounded-full
            border-0
            bg-[#2865e5]
            px-7
            text-[15px]
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#1956d4]
            hover:shadow-md
          "
            >
              Khám phá ngay
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
