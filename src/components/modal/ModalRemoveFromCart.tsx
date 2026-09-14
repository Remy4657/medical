import { useCommonStore } from "@/stores/useCommonStore";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
function RemoveCartAnimation({ animate }: { animate: boolean }) {
  return (
    <div className="relative h-[180px] w-[270px]">
      {" "}
      {/* Ground */}{" "}
      <div className="absolute bottom-[10px] left-1/2 h-px w-[180px] -translate-x-1/2 bg-[#d3d6d8]" />{" "}
      {/* LEFT SIGN - KHÔNG */}{" "}
      <div
        className={[
          "absolute bottom-[12px] left-[30px]",
          "origin-bottom",
          "transition-all duration-700",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          animate
            ? "translate-y-0 rotate-[-6deg] opacity-100"
            : "translate-y-[150px] rotate-[-15deg] opacity-0",
        ].join(" ")}
      >
        {" "}
        {/* Stick */}{" "}
        <div className="absolute left-1/2 top-[54px] h-[92px] w-[4px] -translate-x-1/2 rounded-full bg-[#bfc4c8]" />{" "}
        {/* Sign */}{" "}
        <div className="relative z-10 flex h-[62px] w-[100px] items-center justify-center rounded-[8px] border-2 border-[#d8dadd] bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
          {" "}
          <div className="text-center">
            {" "}
            <div className="text-[10px] font-bold tracking-[1.5px] text-[#9ca1a5]">
              {" "}
              OPTION{" "}
            </div>{" "}
            <div className="mt-1 text-[17px] font-extrabold text-[#4b4f52]">
              {" "}
              KHÔNG{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Decorative circle */}{" "}
        <div className="absolute -right-[7px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#d6d9dc]" />{" "}
      </div>{" "}
      {/* RIGHT SIGN - XÓA */}{" "}
      <div
        className={[
          "absolute bottom-[12px] right-[30px]",
          "origin-bottom",
          "transition-all duration-700 delay-150",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          animate
            ? "translate-y-0 rotate-[6deg] opacity-100"
            : "translate-y-[160px] rotate-[15deg] opacity-0",
        ].join(" ")}
      >
        {" "}
        {/* Stick */}{" "}
        <div className="absolute left-1/2 top-[54px] h-[92px] w-[4px] -translate-x-1/2 rounded-full bg-[#bfc4c8]" />{" "}
        {/* Sign */}{" "}
        <div className="relative z-10 flex h-[62px] w-[100px] items-center justify-center rounded-[8px] border-2 border-[#f0c4dd] bg-[#fff8fc] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
          {" "}
          <div className="text-center">
            {" "}
            <div className="text-[10px] font-bold tracking-[1.5px] text-[#e58ab9]">
              {" "}
              OPTION{" "}
            </div>{" "}
            <div className="mt-1 text-[17px] font-extrabold text-[#e23c95]">
              {" "}
              XÓA{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Decorative circle */}{" "}
        <div className="absolute -left-[7px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#efb7d6]" />{" "}
      </div>{" "}
      {/* Center tiny cart icon */}{" "}
      <div
        className={[
          "absolute left-1/2 top-[28px] -translate-x-1/2",
          "transition-all duration-500 delay-300",
          animate
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-[20px] scale-75 opacity-0",
        ].join(" ")}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-[42px] w-[42px]"
          fill="none"
        >
          {" "}
          <circle cx="32" cy="32" r="21" fill="#F7F7F7" />{" "}
          <path
            d="M20 21H24L27 39H45L49 27H26"
            stroke="#777C80"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <circle cx="29" cy="45" r="2.5" fill="#777C80" />{" "}
          <circle cx="43" cy="45" r="2.5" fill="#777C80" />{" "}
          <path
            d="M31 31L35 35L43 27"
            stroke="#E23C95"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </svg>{" "}
      </div>{" "}
      {/* Small motion lines */}{" "}
      <div
        className={[
          "absolute left-[102px] top-[55px]",
          "transition-all duration-500 delay-200",
          animate
            ? "translate-y-0 opacity-100"
            : "translate-y-[12px] opacity-0",
        ].join(" ")}
      >
        {" "}
        <span className="block h-[2px] w-[18px] rotate-[-15deg] rounded-full bg-[#d6d9dc]" />{" "}
        <span className="mt-2 block h-[2px] w-[11px] rotate-[12deg] rounded-full bg-[#e5e7e9]" />{" "}
      </div>{" "}
      <div
        className={[
          "absolute right-[102px] top-[55px]",
          "transition-all duration-500 delay-250",
          animate
            ? "translate-y-0 opacity-100"
            : "translate-y-[12px] opacity-0",
        ].join(" ")}
      >
        {" "}
        <span className="block h-[2px] w-[18px] rotate-[15deg] rounded-full bg-[#d6d9dc]" />{" "}
        <span className="mt-2 ml-auto block h-[2px] w-[11px] rotate-[-12deg] rounded-full bg-[#e5e7e9]" />{" "}
      </div>{" "}
    </div>
  );
}

const ModalRemoveFromCart = ({ onConfirm }: { onConfirm: () => void }) => {
  const [animate, setAnimate] = useState(false);

  const { isRemoveFromCart, toggleRemoveFromCart } = useCommonStore();

  useEffect(() => {
    if (!isRemoveFromCart) {
      setAnimate(false);
      return;
    }

    // Cho modal render trước, sau đó mới chạy animation
    const timer = window.setTimeout(() => {
      setAnimate(true);
    }, 30);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isRemoveFromCart]);

  if (!isRemoveFromCart) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {" "}
      {/* Overlay */}{" "}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={toggleRemoveFromCart}
      />{" "}
      {/* Modal */}{" "}
      <div className="relative z-10 w-[calc(100%-32px)] max-w-[420px] overflow-hidden rounded-[6px] bg-white px-7 pb-6 pt-4 shadow-2xl">
        {" "}
        {/* Close */}{" "}
        <button
          type="button"
          onClick={toggleRemoveFromCart}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#202020] transition hover:bg-gray-100"
        >
          {" "}
          <X size={18} strokeWidth={2} />{" "}
        </button>{" "}
        {/* Animation */}{" "}
        <div className="flex h-[200px] items-end justify-center overflow-hidden">
          {" "}
          <RemoveCartAnimation animate={animate} />{" "}
        </div>{" "}
        {/* Title */}{" "}
        <h2 className="text-center text-[20px] font-bold text-[#111]">
          {" "}
          Xóa sản phẩm?{" "}
        </h2>{" "}
        {/* Description */}{" "}
        <p className="mt-2 text-center text-[13px] leading-5 text-[#7b7b7b]">
          {" "}
          Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?{" "}
        </p>{" "}
        {/* Actions */}{" "}
        <div className="mt-6 flex items-center justify-center gap-4">
          {" "}
          <button
            type="button"
            onClick={toggleRemoveFromCart}
            className=" min-w-[110px] rounded-[3px] hover:border hover:border-gray-500 px-5 py-2.5 text-[14px] font-medium text-[#444] transition"
          >
            {" "}
            Hủy bỏ{" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => {
              onConfirm();
              toggleRemoveFromCart();
            }}
            className=" min-w-[110px] rounded-[4px] border border-[#e85aa9] bg-[#fff] px-5 py-2.5 text-[14px] font-semibold text-[#e23c95] transition hover:bg-[#fff1f8] "
          >
            {" "}
            Xóa{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ModalRemoveFromCart;
