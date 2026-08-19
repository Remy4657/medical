import { CartState } from "@/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCommonStore = create<any>()(
  devtools((set, get) => ({
    isShowModal: false,
    toggleModal: () =>
      set((state: any) => ({
        isShowModal: !state.isShowModal,
      })),
  })),
);
