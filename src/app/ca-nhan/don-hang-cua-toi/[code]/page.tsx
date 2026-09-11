"use client";
import OrderDetailSkeleton from "@/components/skeleton/OrderDetailSkeleton";
import { OrderStatus } from "@/constants";
import { useDetailOrder } from "@/hooks/useOrder";
import { getOrderDetail } from "@/services/orderService";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderCode = params.code as string;

  const { data: detailOrder, isPending } = useDetailOrder(orderCode);

  if (isPending) {
    return <OrderDetailSkeleton />;
  }
  return (
    <main className="rounded-2xl bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="p-5">
          <MoveLeft
            className="cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
        </div>

        <div className="mx-auto flex h-[68] max-w-[770] items-center justify-center px-4">
          <h1 className="text-[24px] font-semibold text-[#111827]">
            Đơn hàng #{detailOrder?.orderCode}
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-[770] p-4">
        {/* Order status */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14] py-[15]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[16px] ">
              Đặt hàng lúc: {formatDate(detailOrder?.createdAt)}
            </span>

            <span className="shrink-0 text-[16px] font-medium ">
              {detailOrder?.status === OrderStatus.PENDING
                ? "Đang xử lý"
                : "Đã Giao"}
            </span>
          </div>
        </section>

        {/* Customer */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14] py-[15]">
          <p className="mb-1 text-[16px] ">
            {detailOrder?.receiverName},{" "}
            <span>{detailOrder?.receiverPhone}</span>
          </p>

          <p className="text-sm font-normal">{detailOrder?.shippingAddress}</p>
        </section>

        {/* Products */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          {detailOrder?.items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3">
              {/* Product image */}
              <div className="relative h-[100px] w-[80px] shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={item.image ?? "/images/product-placeholder.png"}
                  alt={item.productName}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>

              {/* Product info */}
              <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-[1px]">
                <p className="leading-5 text-sm font-normal text-blue-700">
                  {item.productName} - {item.packageDescription}
                </p>

                <div className="flex items-end justify-between text-sm">
                  <span className="text-sm ">X{item.quantity}</span>

                  <span className="text-sm font-medium ">
                    {formatPrice(item.salePrice)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Summary */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          <div className="space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between gap-4">
              <span className="  font-normal">Tạm tính</span>

              <span className=" ">{formatPrice(detailOrder?.subtotal)}</span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between gap-4">
              <span className="  font-normal">Giảm giá</span>

              <span className=" text-red-600">- 0đ</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between gap-4">
              <span className="  font-normal">Phí vận chuyển</span>

              {detailOrder?.shippingFee == 0 ? (
                <span className=" text-green-600 ">Miễn phí</span>
              ) : (
                <span className=" ">
                  {formatPrice(detailOrder?.shippingFee)}
                </span>
              )}
            </div>

            {/* Payment */}
            <div className="flex items-center justify-between gap-4">
              <span className="  font-normal">Thanh toán</span>

              <span className="text-right ">
                {detailOrder?.paymentMethod === "BANK"
                  ? "Thanh toán bằng chuyển khoản qua QR code"
                  : "Thanh toán khi nhận hàng"}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Total */}
            <div className="flex items-center justify-between gap-4">
              <span className=" ">Thành tiền</span>

              <span className="text-[20px] font-medium text-[#3849a8]">
                {formatPrice(detailOrder?.totalAmount)}
              </span>
            </div>

            {/* Saved */}
            {/* <div className="flex justify-end">
              <span className="text-[14px] ">
                (Tiết kiệm {formatPrice(order.saved)})
              </span>
            </div> */}
          </div>
        </section>

        {/* Home button */}
        <Link
          href="/"
          className="flex h-[55px] w-full items-center justify-center rounded-full bg-[#f0efff] text-[17px] font-medium text-[#3546a3] transition hover:bg-[#e7e5ff]"
        >
          Trang chủ
        </Link>
      </div>
    </main>
  );
}
