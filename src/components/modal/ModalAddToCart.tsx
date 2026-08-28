"use client";

import { useCommonStore } from "@/stores/useCommonStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ModalAddToCart() {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isShowModal, toggleModal } = useCommonStore();

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
  }, [isShowModal]);

  if (!isShowModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-box bg-base-100 p-3 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold"></h3>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => toggleModal()}
          >
            ✕
          </button>
        </div>

        <h3 className="text-lg font-bold text-center">
          Thêm vào giỏ hàng thành công
        </h3>

        <div className="flex mt-5 gap-3 justify-end">
          <button
            type="button"

            className="btn btn-outline rounded-full"
            onClick={() => {
              toggleModal();
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-outline hover:bg-none btn-primary rounded-full"
            onClick={() => {
              router.push("/gio-hang");
              toggleModal();
            }}
          >
            Đi đến giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
