"use client";
import Link from "next/link";
type ResultType = "success" | "cancel";

interface PaymentResultProps {
  type: string;

  orderCode?: string;
  code?: string;
  paymentId?: string;
  cancel?: string;
  paymentStatus?: string;
}

export default function PaymentResult({
  type,
  orderCode,
  code,
  paymentId,
  cancel,
  paymentStatus,
}: PaymentResultProps) {
  const isSuccess = type === "success";

  if (isSuccess) {
    return (
      <main className="flex h-[500]">
        <div className="w-200 m-auto rounded-xl bg-white p-15 shadow-sm">
          <h1 className="text-center font-bold text-blue-500 text-xl">
            Đặt hàng thành công!
          </h1>

          <p className="mt-2 text-center text-sm leading-6 text-[#15294d]">
            Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
          </p>

          <Link
            href="/"
            className="w-50 mx-auto mt-5 flex h-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
          >
            Về trang chủ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[500]">
      <div className="m-auto rounded-xl bg-white p-15 w-200 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
          !
        </div>

        <h1 className="mt-4 text-center text-[18px] font-bold text-orange-500">
          Đã hủy thanh toán!
        </h1>

        <p className="mt-2 text-center text-sm leading-6 text-gray-600">
          Bạn đã hủy quá trình thanh toán cho đơn hàng.
        </p>
        <Link
          href="/"
          className="w-50 mx-auto mt-6 flex h-11 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
