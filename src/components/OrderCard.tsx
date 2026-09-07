"use client";
import { OrderStatus } from "@/constants";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

type OrderItem = {
  productName: string;
  packageDescription: string;
  salePrice: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  orderCode: string;
  createdAt: string;
  status: string;
  items: OrderItem[];
  paymentMethod: string;
  totalAmount: number;
};

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <Link href={`don-hang-cua-toi/${order.orderCode}`}>
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span>Đơn hàng #{order.orderCode}</span>
          </div>
          <button
            type="button"
            className="text-gray-400 transition hover:text-gray-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </Link>

      {/* Order info */}
      <div className="px-4">
        <div className="flex items-center justify-between py-4">
          <div className="text">
            Đặt hàng lúc:{" "}
            <span className="font-medium">{formatDate(order.createdAt)}</span>
          </div>

          <div className="font-normal">
            {order.status === OrderStatus.PENDING ? "Đang xử lý" : "Đã giao"}
          </div>
        </div>

        {/* Products */}
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="leading-5 text-sm font-normal text-blue-700">
                  {item.productName} - {item.packageDescription}
                </div>

                <div className="mt-1 text-sm">
                  {formatPrice(item.salePrice)}
                </div>
              </div>

              <div className="self-start font-normal text-sm">
                X{item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between py-3">
          <div className="">
            Thanh toán:{" "}
            <span>
              {order.paymentMethod === "COD"
                ? "Thanh toán khi nhận hàng"
                : "Thanh toán qua QR code"}
            </span>
          </div>

          <div className="">{formatPrice(order.totalAmount)}</div>
        </div>
      </div>
    </div>
  );
}
