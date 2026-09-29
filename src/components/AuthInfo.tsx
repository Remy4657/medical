"use client";
import {
  CircleUserRound,
  ClipboardClock,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { ShoppingCartIcon } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect, useState } from "react";
import HeaderActionsSkeleton from "./skeleton/HeaderActionsSkeleton";
import { useCommonStore } from "@/stores/useCommonStore";
import getLastWord from "@/utils/getLastWord";

const AuthInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const { items } = useCartStore();
  const [userName, setUserName] = useState<string | null>("");
  const [isDark, setIsDark] = useState(false);
  const { toggleModalConfirmLogout } = useCommonStore();

  useEffect(() => {
    setUserName(session?.user.name ?? null);
  }, [session?.user.name]);

  if (isPending) {
    return <HeaderActionsSkeleton />;
  }

  const handleLogout = async () => {
    toggleModalConfirmLogout();
  };
  return (
    <div className="navbar-end text-white">
      <div className="flex flex-row items-center bg-blue-800 px-3 py-1 rounded-3xl">
        <label className="mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="theme-controller hidden"
            value="dark"
            data-set-theme
            onChange={(e) => setIsDark(e.target.checked)}
          />

          {isDark ? <Sun /> : <Moon />}
        </label>

        <Link
          href="/gio-hang"
          className="relative pl-0 btn btn-ghost gap-2 font-medium indicator text-white"
          aria-label={"Cart"}
        >
          <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
          {items?.length > 0 && (
            <span className="absolute right-0 top-0 px-2 rounded-full bg-primary">
              {items.length}
            </span>
          )}
        </Link>
        <div className="hidden sm:block ml-5">
          {userName ? (
            <div className="dropdown dropdown-hover">
              <span className="flex cursor-pointer">
                <CircleUserRound />
                Xin chào, {getLastWord(userName)}
              </span>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-0 rounded-box z-1 w-58 p-2 shadow-sm text-base-content font-normal text-lg"
              >
                <li>
                  <Link className="btn-ghost" href="/ca-nhan/thong-tin-ca-nhan">
                    <CircleUserRound size={20} strokeWidth={1} />
                    <span>Thông tin cá nhân</span>
                  </Link>
                </li>
                <li>
                  <Link className="btn-ghost" href="/ca-nhan/don-hang-cua-toi">
                    <ClipboardClock size={20} strokeWidth={1} />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn-ghost"
                    onClick={async () => {
                      await handleLogout();
                    }}
                  >
                    <LogOut size={20} strokeWidth={1} className="" />
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-ghost text-white"
              onClick={() =>
                (
                  document.getElementById("modal_login") as HTMLDialogElement
                ).showModal()
              }
            >
              <CircleUserRound />
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthInfo;
