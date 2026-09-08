"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCommonStore } from "@/stores/useCommonStore";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export default function ModalLogout() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const { signOut } = useCart();

  const { isShowModalConfirmLogout, toggleModalConfirmLogout } =
    useCommonStore();

  useEffect(() => {
    if (!isShowModalConfirmLogout) {
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
  }, [isShowModalConfirmLogout]);

  if (!isShowModalConfirmLogout) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={toggleModalConfirmLogout}
      />

      {/* Modal */}
      <div className="relative z-10 w-[calc(100%-32px)] max-w-[420] overflow-hidden rounded-[4px] bg-white px-7 pb-6 pt-4 shadow-2xl">
        {/* Close */}
        <button
          type="button"
          onClick={toggleModalConfirmLogout}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-[#202020] transition hover:bg-gray-100"
        >
          <X size={18} strokeWidth={2} />
        </button>

        {/* Animation */}
        <div className="flex h-[210] items-center justify-center">
          <LogoutDoorAnimation animate={animate} />
        </div>

        {/* Title */}
        <h2 className="text-center text-[20px] font-bold text-[#111]">
          Đăng xuất?
        </h2>

        {/* Description */}
        <p className="mt-2 text-center text-[13px] text-[#7b7b7b]">
          Bạn có chắc chắn muốn đăng xuất không ?
        </p>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={toggleModalConfirmLogout}

            className=" rounded-[3px] min-w-[90] px-5 py-2 text-[14px] font-medium text-[#111] transition hover:border hover:border-gray-500"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={() => {
              toggleModalConfirmLogout();
              signOut();
              router.push("/");
            }}
            className="
              min-w-[140]
              rounded-[3px]
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
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SVG DOOR
========================================================= */

function LogoutDoorAnimation({ animate }: { animate: boolean }) {
  return (
    <div className="relative h-[190px] w-[220px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 200"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* ================= BACKGROUND ================= */}

        <ellipse cx="110" cy="104" rx="67" ry="52" fill="#F4F5F5" />

        {/* Ground */}
        <path d="M42 157H178" stroke="#C5C9CD" strokeWidth="1.3" />

        {/* ================= LEFT ARROWS ================= */}

        <g
          className={[
            "transition-all duration-700",
            !animate ? "-translate-x-2 opacity-100" : "translate-x-0 opacity-0",
          ].join(" ")}
        >
          <path d="M52 43H65" stroke="#D2D5D8" strokeWidth="1.4" />

          <path
            d="M65 43L61 40M65 43L61 46"
            stroke="#D2D5D8"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        <g
          className={[
            "transition-all duration-700 delay-75",
            !animate ? "translate-x-0 opacity-100" : "translate-x-7 opacity-0",
          ].join(" ")}
        >
          <path d="M38 86H54" stroke="#D2D5D8" strokeWidth="1.5" />

          <path
            d="M54 86L49 81M54 86L49 91"
            stroke="#D2D5D8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* ================= RIGHT ARROWS ================= */}

        <g
          className={[
            "transition-all duration-700 delay-100",
            animate
              ? "translate-x-0 opacity-100"
              : "-translate-x-[6px] opacity-0",
          ].join(" ")}
        >
          <path d="M168 48V59" stroke="#D2D5D8" strokeWidth="1.5" />

          <path
            d="M168 59L163 54M168 59L173 54"
            stroke="#D2D5D8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        <g
          className={[
            "transition-all duration-700 delay-150",
            animate
              ? "translate-y-0 opacity-100"
              : "-translate-y-[5px] opacity-0",
          ].join(" ")}
        >
          <path d="M182 87V99" stroke="#D2D5D8" strokeWidth="1.5" />

          <path
            d="M182 99L178 95M182 99L186 95"
            stroke="#D2D5D8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* ================= EXIT SIGN ================= */}

        <g>
          <rect x="91" y="23" width="38" height="13" rx="1" fill="#263238" />

          <text
            x="110"
            y="32.4"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#F8EF00"
          >
            EXIT
          </text>
        </g>

        {/* ================= DOOR FRAME ================= */}

        <path d="M75 36V158" stroke="#AEB4B8" strokeWidth="2" />
        <path d="M145 36V158" stroke="#AEB4B8" strokeWidth="2" />
        <path d="M75 36H145" stroke="#AEB4B8" strokeWidth="2" />

        {/* ================= DOOR ================= */}

        {/* LEFT DOOR */}
        <g
          className={[
            "transition-all duration-1000",
            "ease-[cubic-bezier(0.77,0,0.175,1)]",
            animate
              ? "-translate-x-[32px] -rotate-y-[12deg]"
              : "translate-x-0 rotate-y-0",
          ].join(" ")}
          style={{
            transformOrigin: "110px 97px",
          }}
        >
          <path d="M77 37H110V157H77V37Z" fill="#263238" />

          {/* Door center */}
          <path d="M110 37V157" stroke="#F5F6F7" strokeWidth="2" />

          {/* Door diagonal */}
          <path d="M77 108L110 123" stroke="#F5F6F7" strokeWidth="2" />

          <path d="M77 108V157" stroke="#F5F6F7" strokeWidth="2" />
        </g>

        {/* RIGHT DOOR */}
        <g
          className={[
            "transition-all duration-1000",
            "ease-[cubic-bezier(0.77,0,0.175,1)]",
            animate
              ? "translate-x-[32px] rotate-y-[12deg]"
              : "translate-x-0 rotate-y-0",
          ].join(" ")}
          style={{
            transformOrigin: "110px 97px",
          }}
        >
          <path d="M110 37H143V157H110V37Z" fill="#263238" />

          {/* Door center */}
          <path d="M110 37V157" stroke="#F5F6F7" strokeWidth="2" />

          {/* Door diagonal */}
          <path d="M110 123L143 108" stroke="#F5F6F7" strokeWidth="2" />

          <path d="M143 108V157" stroke="#F5F6F7" strokeWidth="2" />
        </g>

        {/* ================= SIDE SHADOW ================= */}

        <ellipse cx="110" cy="158" rx="38" ry="3" fill="#D8DBDE" />
      </svg>
    </div>
  );
}
