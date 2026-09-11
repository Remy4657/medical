"use client";

import { useCartStore } from "@/stores/useCartStore";
import api from "./api";
import { CartItem } from "@/types/store";
import { useCartQuery } from "@/hooks/useCart";
import { useEffect } from "react";
import { syncCartService } from "@/services/cartService";

/**
 * Mỗi variant có một sync state riêng.
 *
 * confirmedQuantity:
 *   quantity cuối cùng đã được server xác nhận.
 *
 * desiredQuantity:
 *   quantity mà UI hiện tại muốn server có.
 *
 * timer:
 *   debounce timer.
 *
 * inFlight:
 *   API đang chạy hay không.
 */
type SyncState = {
  confirmedQuantity: number;
  desiredQuantity: number;
  timer?: ReturnType<typeof setTimeout>;
  inFlight: boolean;
};

const syncStates = new Map<number, SyncState>(); // lưu trữ sync state cho từng variantId

const DEBOUNCE_TIME = 1000;

/**
 * Lấy quantity hiện tại từ Zustand.
 *
 * Ví dụ:
 * server = 3
 * user click + => Zustand = 4
 *
 * hàm này trả về 4.
 */
function getCurrentQuantity(variantId: number): number {
  const item = useCartStore
    .getState()
    .items.find((item) => item.variantId === variantId);

  return item?.quantity ?? 0;
}

export function CartSync({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { data, isSuccess } = useCartQuery(isLoggedIn);
  const setItems = useCartStore((state) => state.setItems);

  useEffect(() => {
    if (!isSuccess || !data) return;

    setItems(data.items);
  }, [data, isSuccess, setItems]);
  return null;
}

/**
 * Được gọi sau khi login + merge thành công.
 *
 * Server trả:
 *
 * variant 10 -> quantity 3
 * variant 20 -> quantity 5
 *
 * Ta lưu quantity này làm "confirmedQuantity".
 *
 * Sau này nếu API lỗi thì rollback về đây.
 */
export function initializeCartSync(items: CartItem[]) {
  // Xóa state cũ.
  syncStates.clear();

  for (const item of items) {
    syncStates.set(item.variantId, {
      confirmedQuantity: item.quantity,
      desiredQuantity: item.quantity,
      inFlight: false,
    });
  }
  return syncStates;
}

/**
 * Được gọi sau mỗi thao tác:
 *
 * add
 * increase
 * decrease
 * remove
 *
 * Nếu guest => return, không API.
 *
 * Nếu logged in => debounce API.
 */
export function scheduleCartSync(variantId: number) {
  const store = useCartStore.getState();

  if (!store.isLoggedIn) {
    return;
  }

  // Login rồi nhưng chưa merge server cart xong
  // => chưa được phép gọi PATCH.
  if (!store.isCartReady) {
    return;
  }

  let state = syncStates.get(variantId);
  /**
   * Trường hợp variant chưa có sync state.
   *
   * Ví dụ:
   *
   * server quantity = 0
   * user Add To Cart
   * Zustand quantity = 1
   */
  // nếu variant lần đầu được thêm vào giỏ hàng (mảng items chưa có variant này)
  const currentQuantity = getCurrentQuantity(variantId);
  if (!state) {
    // Lấy quantity mới nhất từ Zustand.
    state = {
      confirmedQuantity: 0,
      desiredQuantity: currentQuantity,
      inFlight: false,
    };

    syncStates.set(variantId, state);
  }

  /**
   * Nếu user click liên tục:
   *
   * click 1 -> tạo timer
   * click 2 -> clear timer cũ -> tạo timer mới
   * click 3 -> clear timer cũ -> tạo timer mới
   *
   * Chỉ khi user ngừng click 300ms mới gọi API.
   */
  if (state.timer) {
    clearTimeout(state.timer);
  }

  state.timer = setTimeout(() => {
    syncCartItem(variantId);
  }, DEBOUNCE_TIME);
}

async function syncCartItem(variantId: number) {
  const state = syncStates.get(variantId);
  if (!state) {
    return;
  }
  state.timer = undefined;

  /**
   * Nếu request cũ đang chạy:
   *
   * không tạo request thứ 2.
   *
   * finally của request cũ sẽ kiểm tra
   * xem UI có thay đổi không để sync tiếp.
   */
  if (state.inFlight) {
    return;
  }
  //const quantityToSync = state.desiredQuantity;
  const quantityToSync = getCurrentQuantity(variantId);

  state.inFlight = true;

  try {
    await syncCartService(variantId, quantityToSync);
    state.confirmedQuantity = quantityToSync; // nếu call api thành công, lưu lại để rollback
  } catch (error) {
    console.error("Sync cart failed:", error);

    const currentQuantity = getCurrentQuantity(variantId);

    if (currentQuantity === quantityToSync) {
      rollbackQuantity(variantId, state.confirmedQuantity); // cập nhật lại số lượng quantity của variant trong redux đê hiển thị UI
      state.desiredQuantity = state.confirmedQuantity; // cập nhật lại state.desiredQuantity = state.confirmedQuantity nếu không thành công
    }
  } finally {
    state.inFlight = false;

    const latestQuantity = getCurrentQuantity(variantId); // phải gọi lại getCurrentQuantity vì có thể rơi vào trường hợp cacch, rollback sẽ làm thay đổi quantity nên gọi lại để lấy giá trị mới nhất

    /*
     * TH success: thì state.confirmedQuantity được gán = currentQuantity rồi nên dk if sai
     * TH catch:   thì rollback cập nhật lại currentQuantity trong redux => dk if cũng sai nên không duplicate syncart
     *
     * */
    if (latestQuantity !== state.confirmedQuantity) {
      state.desiredQuantity = latestQuantity;
      scheduleCartSync(variantId);
    }
  }
}

/**
 * Rollback Zustand về quantity cuối cùng
 * server đã xác nhận.
 */
function rollbackQuantity(variantId: number, quantity: number) {
  useCartStore.setState((state: any) => {
    // quantity = 0 => remove item
    if (quantity === 0) {
      return {
        items: state.items.filter((item: any) => item.variantId !== variantId),
      };
    }

    const exists = state.items.some(
      (item: any) => item.variantId === variantId,
    );

    // Item chưa có nhưng rollback về quantity > 0
    if (!exists) {
      return {
        items: [
          ...state.items,
          {
            variantId,
            quantity,
          },
        ],
      };
    }

    return {
      items: state.items.map((item: any) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    };
  });
}
