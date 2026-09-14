"use client";

import { useCommonStore } from "@/stores/useCommonStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ModalAddToCart() {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isShowModal, toggleModal } = useCommonStore();

  const [animate, setAnimate] = useState(false);

  // Chạy animation mỗi khi modal mở
  useEffect(() => {
    if (!isShowModal) {
      setAnimate(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setAnimate(true);
    }, 30);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isShowModal]);

  // Click bên ngoài modal để đóng
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };

    if (isShowModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowModal, toggleModal]);

  if (!isShowModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        ref={modalRef}
        className="
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-[6px]
          bg-base-100
          px-6
          pb-5
          pt-4
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#555] transition hover:bg-gray-100"
            onClick={toggleModal}
          >
            ✕
          </button>
        </div>

        {/* Animation */}
        <AddToCartAnimation animate={animate} />

        {/* Title */}
        <h3 className="text-center text-[19px] font-bold text-[#111]">
          Thêm vào giỏ hàng thành công!
        </h3>

        {/* Description */}
        <p className="mt-2 text-center text-[13px] text-[#777]">
          Sản phẩm đã được thêm vào giỏ hàng của bạn.
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            className="
              min-w-[100px]
              rounded-[4px]
              border
              border-gray-300
              bg-white
              px-5
              py-2
              text-[14px]
              font-medium
              text-[#333]
              transition
              hover:bg-gray-50
            "
            onClick={toggleModal}
          >
            Đóng
          </button>

          <button
            type="button"
            className="
              min-w-[145px]
              rounded-[4px]
              border
              border-[#e85aa9]
              bg-white
              px-5
              py-2
              text-[14px]
              font-semibold
              text-[#e23c95]
              transition
              hover:bg-[#fff1f8]
            "
            onClick={() => {
              toggleModal();
              router.push("/gio-hang");
            }}
          >
            Đi đến giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADD TO CART ANIMATION
========================================================= */

function AddToCartAnimation({ animate }: { animate: boolean }) {
  return (
    <div className="flex h-[170px] w-full items-center justify-center">
      {" "}
      <div
        className={[
          "flex h-[90px] w-[90px] items-center justify-center",
          "rounded-full bg-[#e23c95]",
          "transition-all duration-400",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          animate
            ? "translate-y-0 scale-100 rotate-0 opacity-100"
            : "translate-y-[-60px] scale-50 rotate-[-20deg] opacity-0",
        ].join(" ")}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-[48px] w-[48px]"
          fill="none"
        >
          {" "}
          <path
            d="M16 33L27 44L49 21"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={[
              "transition-all duration-500 delay-100",
              animate ? "stroke-dashoffset-0 opacity-100" : "opacity-0",
            ].join(" ")}
          />{" "}
        </svg>{" "}
      </div>{" "}
    </div>
  );
}

/* =========================================================
   PRODUCT
========================================================= */

function ProductBox() {
  return (
    <div className="relative h-[62px] w-[54px]">
      {/* Box */}
      <div className="absolute left-[5px] top-[14px] h-[44px] w-[44px] rounded-[5px] border-2 border-[#b8bdc1] bg-white shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
        {/* Front label */}
        <div className="absolute left-[7px] right-[7px] top-[10px] h-[20px] rounded-[2px] bg-[#fff1f8]">
          <div className="absolute left-[6px] right-[6px] top-[5px] h-[3px] rounded-full bg-[#e9a5c9]" />
          <div className="absolute left-[10px] right-[10px] top-[11px] h-[3px] rounded-full bg-[#d9dde0]" />
        </div>
      </div>

      {/* Top flap */}
      <div className="absolute left-[5px] top-[8px] h-[12px] w-[44px] rounded-[3px] border-2 border-[#b8bdc1] bg-[#f8f9fa]" />

      {/* Ribbon */}
      <div className="absolute left-[25] top-[14px] h-[44px] w-[5px] bg-[#f0bdd8]" />
    </div>
  );
}

/* =========================================================
   CART ICON
========================================================= */

function CartIcon({ animate }: { animate: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 70"
      className={[
        "h-[95px] w-[145px]",
        "transition-transform duration-200",
        animate ? "-translate-y-0.5" : "",
      ].join(" ")}
      fill="none"
    >
      {/* Cart handle */}
      <path
        d="M10 10H20L28 48H87L99 23H25"
        stroke="#8B9094"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cart body */}
      <path
        d="M28 48H87"
        stroke="#8B9094"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Wheels */}
      <circle cx="37" cy="58" r="5" fill="#777C80" />
      <circle cx="78" cy="58" r="5" fill="#777C80" />

      {/* Product inside cart */}
      <g
        className={[
          "origin-center transition-all duration-500 delay-300",
          animate
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-1 scale-75 opacity-0",
        ].join(" ")}
      >
        <path
          d="M45 23H70V47H45V23Z"
          fill="#FFF8FC"
          stroke="#DDA8C6"
          strokeWidth="2"
        />

        <path
          d="M45 23L57.5 16L70 23"
          fill="#F8EDF3"
          stroke="#DDA8C6"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path d="M57.5 16V47" stroke="#E7B7D1" strokeWidth="2" />

        <path
          d="M50 31H65"
          stroke="#E5A3C5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M52 36H63"
          stroke="#D2D6D9"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
