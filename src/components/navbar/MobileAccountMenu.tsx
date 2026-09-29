"use client";

import Link from "next/link";
import { CircleUserRound, ClipboardClock, LogIn, LogOut } from "lucide-react";
import getLastWord from "@/utils/getLastWord";
import { authClient } from "../../lib/auth-client";
import { useEffect, useState } from "react";
import { useCommonStore } from "@/stores/useCommonStore";

export default function MobileAccountMenu() {
  const { data: session, isPending } = authClient.useSession();

  const [userName, setUserName] = useState<string | null>("");
  const { toggleModalConfirmLogout } = useCommonStore();

  useEffect(() => {
    setUserName(session?.user.name ?? null);
  }, [session?.user.name]);

  const handleLogout = async () => {
    toggleModalConfirmLogout();
  };
  return (
    <div className="">
      {userName ? (
        <ul className="menu w-full p-0">
          <li className="mb-3">
            <details>
              <summary className="text-base font-medium">
                <div className=" flex items-center gap-2 font-medium justify-center">
                  <CircleUserRound size={20} />
                  <span>Xin chào, {getLastWord(userName)}</span>
                </div>
              </summary>

              <ul>
                <li>
                  <Link href="/ca-nhan/thong-tin-ca-nhan">
                    <CircleUserRound size={20} strokeWidth={1.5} />
                    <span>Thông tin cá nhân</span>
                  </Link>
                </li>

                <li>
                  <Link href="/ca-nhan/don-hang-cua-toi">
                    <ClipboardClock size={20} strokeWidth={1.5} />
                    <span>Đơn hàng của tôi</span>
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    <LogOut size={20} strokeWidth={1.5} />
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <button
          className="px-0 btn btn-ghost w-full justify-start"
          onClick={() => {
            const modal = document.getElementById(
              "modal_login",
            ) as HTMLDialogElement | null;

            modal?.showModal();
          }}
        >
          <LogIn size={20} />
          Đăng nhập
        </button>
      )}
    </div>
  );
}
