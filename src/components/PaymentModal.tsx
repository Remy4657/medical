"use client";

import { useEffect, useMemo, useState } from "react";
import { usePayOS, PayOSConfig } from "payos-checkout";

interface PaymentModalProps {
  isOpenModal: boolean;
  checkoutUrl: string;
  expiredAt: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  isOpenModal,
  checkoutUrl,
  expiredAt,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [remaining, setRemaining] = useState(
    Math.max(0, expiredAt - Math.floor(Date.now() / 1000)),
  );

  /**
   * Countdown
   */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const value = Math.max(0, expiredAt - now);

      setRemaining(value);

      if (value <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isOpenModal]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const config: PayOSConfig = useMemo(
    () => ({
      RETURN_URL: `${window.location.origin}` + `/dat-hang/success`,
      ELEMENT_ID: "payos-checkout",
      CHECKOUT_URL:
        "https://pay.payos.vn/web/bba077eba6bc4cd28287b18e95f216e3/",

      // Quan trọng
      //embedded: true,

      onSuccess: (event) => {
        console.log("PayOS success:", event);
      },

      onCancel: (event) => {
        console.log("PayOS cancel:", event);
      },

      onExit: () => {
        console.log("PayOS exit");
      },
    }),
    [checkoutUrl],
  );

  const { open: openPayOs, exit: exitPayOs } = usePayOS(config);

  /**
   * Mỗi khi modal mở,
   * render PayOS vào div
   */
  useEffect(() => {
    if (!isOpenModal) return;
    if (!checkoutUrl) return;

    const timer = setTimeout(() => {
      openPayOs();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpenModal]);

  /**
   * Hết hạn
   */
  const expired = remaining <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-base-100 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Thanh toán đơn hàng</h2>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => {
              exitPayOs();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Countdown */}
        <div className="border-b px-5 py-3 text-center">
          {expired ? (
            <p className="font-medium text-error">Mã thanh toán đã hết hạn</p>
          ) : (
            <p>
              Thời gian thanh toán còn:{" "}
              <span className="font-bold text-error">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
            </p>
          )}
        </div>

        {/* PayOS */}
        <div>
          {!expired && (
            <div id="payos-checkout" className="min-h-[600] min-w-[800]" />
          )}

          {/* Expired */}
          {expired && (
            <div className="flex flex-col items-center gap-4 p-10">
              <p>Phiên thanh toán đã hết hạn.</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                }}
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
