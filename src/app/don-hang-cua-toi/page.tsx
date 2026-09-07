"use client";
import Breadcrumb from "@/components/BreadCrumb";
import OrderCard from "@/components/OrderCard";
import { OrderSkeleton } from "@/components/skeleton/OrderSkeleton";
import { OrderStatus } from "@/constants";
import { useOrderQueryPagination } from "@/hooks/useOrderQuery";
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
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

const menuItems = [
  {
    label: "Thông tin cá nhân",
    icon: UserRound,
  },
  {
    label: "Đơn hàng của tôi",
    icon: Package,
    active: true,
  },
  {
    label: "Đăng xuất",
    icon: LogOut,
  },
];

const tabs = ["Tất cả", "Đang xử lý", "Đã giao"];

export default function MyOrdersPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const { data, isPending, isLoading, isPlaceholderData, isFetching } =
    useOrderQueryPagination(orderStatus, page);

  const hasNextPage = data?.pagination.hasNextPage ?? true;

  useEffect(() => {
    if (!hasNextPage) return;
    queryClient.prefetchQuery({
      queryKey: ["orders", "pagination", page + 1],
      queryFn: () => getOrderByUser(orderStatus, page + 1),
      staleTime: Infinity,
    });
  }, [page, queryClient, hasNextPage]);

  return (
    <div className="min-h-screen text-[#10254a]">
      <div className="mx-auto w-full max-w-[1500] px-4 py-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: "Đơn hàng của tôi", slug: "/" }]} />

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[362px_minmax(0,1fr)]">
          {/* ================= SIDEBAR ================= */}
          <aside>
            {/* Profile card */}
            {/* <div className="relative mb-5 h-[220] overflow-hidden rounded-2xl bg-linear-to-br from-[#2772ee] to-[#1d58dc] shadow-sm">
              <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -right-12 bottom-[-30] h-40 w-40 rounded-full bg-white/5" />

              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="mb-3 flex h-[76] w-[76] items-center justify-center rounded-full bg-white/20 ring-1 ring-white/20">
                  <UserRound
                    size={45}
                    strokeWidth={1.5}
                    className="text-white/90"
                  />
                </div>

                <div className="text-[19px] font-semibold text-white">
                  Anh Đạt
                </div>

                <div className="mt-1 text-[15px] font-medium text-white">
                  0378404595
                </div>
              </div>
            </div> */}

            {/* Navigation */}
            <nav className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={[
                      "group flex min-h-[70] w-full items-center gap-3 border-l-2 px-4 text-left transition",
                      item.active
                        ? "border-[#1760e9] bg-[#eef1f5] text-[#1760e9]"
                        : "border-transparent bg-white text-[#16345f] hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      className={
                        item.active ? "text-[#1760e9]" : "text-[#0f1e36]"
                      }
                    />

                    <span className="flex-1 font-medium">{item.label}</span>

                    <ChevronRight
                      size={23}
                      strokeWidth={1.7}
                      className={
                        item.active ? "text-[#1760e9]" : "text-[#111827]"
                      }
                    />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ================= CONTENT ================= */}
          <main className="min-w-0">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-[24px] font-bold">Đơn hàng của tôi</h1>

              {/* Search */}
              <div className="relative w-full xl:max-w-[620]">
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
              </div>
            </div>

            {/* Tabs */}
            <div className="flex min-w-[680] tabs tabs-border">
              {tabs.map((tab, index) => (
                <Fragment key={tab}>
                  <input
                    type="radio"
                    name="my_tab"
                    className="tab text-primary"
                    aria-label={tab}
                    defaultChecked={index === 0 ? true : false}
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
                  />
                  <div className="tab-content mt-5">
                    {isPending === true ? (
                      <OrderSkeleton />
                    ) : data?.orders.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {data?.orders.map((order: any) => (
                            <OrderCard key={order.id} order={order} />
                          ))}
                        </div>
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
                      <section className="flex min-h-[420] flex-col items-center justify-center bg-[#eef1f5] px-4 py-12">
                        {/* Illustration */}
                        <div className="relative mb-7 h-[185] w-[270]">
                          {/* Shadow */}
                          <div className="absolute bottom-1 left-1/2 h-[38] w-[240] -translate-x-1/2 rounded-[50%] bg-[#cbd2dc]" />

                          {/* Flying paper */}
                          <div className="absolute right-[76] top-0 rotate-[25]">
                            <Plane
                              size={29}
                              strokeWidth={1.4}
                              className="fill-[#cbd2dc] text-[#b8c1cf]"
                            />
                          </div>

                          {/* Dotted flight path */}
                          <svg
                            className="absolute right-[73] top-[20]"
                            width="65"
                            height="120"
                            viewBox="0 0 65 120"
                            fill="none"
                          >
                            <path
                              d="M18 0C51 17 55 49 38 66C23 81 6 73 5 88C4 101 20 109 31 116"
                              stroke="#c1c9d5"
                              strokeWidth="1.5"
                              strokeDasharray="5 5"
                            />
                          </svg>

                          {/* Box */}
                          <div className="absolute bottom-[30px] left-1/2 h-[72px] w-[104px] -translate-x-1/2">
                            {/* Back/top */}
                            <div className="absolute left-[5px] top-0 h-[40px] w-[94px] skew-x-[28deg] rounded-sm bg-[#c5ccd7]" />

                            {/* Front */}
                            <div className="absolute bottom-0 left-[20px] h-[48px] w-[70px] bg-[#d5dbe4]">
                              <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#c0c8d4]" />
                            </div>

                            {/* Left flap */}
                            <div className="absolute left-0 top-[4px] h-[34px] w-[48px] -skew-y-[22deg] bg-[#bfc7d3]" />

                            {/* Right flap */}
                            <div className="absolute right-0 top-[4px] h-[34px] w-[48px] skew-y-[22deg] bg-[#cbd2dc]" />
                          </div>
                        </div>

                        <h2 className="text-center text-[22px] font-bold text-[#3e526e]">
                          Bạn chưa có đơn hàng nào.
                        </h2>

                        <p className="mt-2 max-w-[510px] text-center leading-7 text-[#61748e]">
                          Cùng khám phá hàng ngàn sản phẩm
                          <br className="hidden sm:block" />
                          tại Nhà thuốc FPT Long Châu nhé!
                        </p>

                        <button
                          type="button"
                          className="btn mt-5 h-[60px] min-h-0 rounded-full border-0 bg-[#2865e5] px-8 font-bold text-white shadow-none hover:bg-[#1956d4]"
                        >
                          Khám phá ngay
                        </button>
                      </section>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
