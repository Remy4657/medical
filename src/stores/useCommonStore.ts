import { CartState } from "@/types/store";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useCommonStore = create<any>()(
  devtools((set, get) => ({
    isShowModal: false,
    isShowModalConfirmLogout: false,
    toggleModal: () =>
      set((state: any) => ({
        isShowModal: !state.isShowModal,
      })),
    toggleModalConfirmLogout: () =>
      set((state: any) => ({
        isShowModalConfirmLogout: !state.isShowModalConfirmLogout,
      })),
  })),
);
