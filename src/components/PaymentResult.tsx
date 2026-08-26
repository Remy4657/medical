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

  // Không phải URL hợp lệ
  //   if (!isSuccess && !isCancel) {
  //     return (
  //       <main className="flex min-h-screen items-center justify-center bg-[#f1f4f8] px-4">
  //         <div className="w-full max-w-md rounded-xl bg-white p-6 text-center">
  //           <h1 className="text-lg font-bold text-gray-800">
  //             Trang không tồn tại
  //           </h1>

  //           <Link
  //             href="/"
  //             className="mt-5 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
  //           >
  //             Về trang chủ
  //           </Link>
  //         </div>
  //       </main>
  //     );
  //   }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#f1f4f8] px-4 py-8">
        <div className="mx-auto w-full max-w-[395px]">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h1 className="text-center text-[18px] font-bold text-blue-600">
              Đặt hàng thành công
            </h1>

            <p className="mt-2 text-center text-sm leading-6 text-[#15294d]">
              Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
            </p>

            <Link
              href="/"
              className="mt-3 flex h-11 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f4f8] px-4">
      <div className="w-full max-w-[395px] rounded-xl bg-white p-5 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
          !
        </div>

        <h1 className="mt-4 text-center text-[18px] font-bold text-orange-500">
          Đã hủy thanh toán
        </h1>

        <p className="mt-2 text-center text-sm leading-6 text-gray-600">
          Bạn đã hủy quá trình thanh toán cho đơn hàng.
        </p>
        <Link
          href="/"
          className="mt-6 flex h-11 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
