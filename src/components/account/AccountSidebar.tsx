"use client";

import { authClient } from "@/lib/auth-client";
import { useCommonStore } from "@/stores/useCommonStore";
import { UserRound, Package, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Thông tin cá nhân",
    href: "/ca-nhan/thong-tin-ca-nhan",
    icon: UserRound,
  },
  {
    label: "Đơn hàng của tôi",
    href: "/ca-nhan/don-hang-cua-toi",
    icon: Package,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const { toggleModalConfirmLogout } = useCommonStore();

  return (
    <aside>
      {/* Profile card */}
      <div className="relative mb-5 h-[220] overflow-hidden rounded-2xl bg-linear-to-br from-[#2772ee] to-[#1d58dc] shadow-sm">
        <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute -right-12 bottom-[-30] h-40 w-40 rounded-full bg-white/5" />

        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="mb-3 flex h-[76] w-[76] items-center justify-center rounded-full bg-white/20 ring-1 ring-white/20">
            <UserRound size={45} strokeWidth={1.5} className="text-white/90" />
          </div>

          <div className="text-[19px] font-semibold text-white">
            {session?.user.name}
          </div>

          <div className="mt-1 text-[15px] font-medium text-white">
            Thân thiết
          </div>
        </div>
      </div>
      <nav className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex min-h-[70px] w-full items-center gap-3",
                "border-l-2 px-4 text-left transition",
                active
                  ? "border-[#1760e9] bg-[#eef1f5] text-[#1760e9]"
                  : "border-transparent bg-white text-[#16345f] hover:bg-slate-50",
              ].join(" ")}
            >
              <Icon
                size={25}
                strokeWidth={1.7}
                className={active ? "text-[#1760e9]" : "text-[#0f1e36]"}
              />

              <span className="flex-1 font-medium">{item.label}</span>

              <ChevronRight
                size={23}
                strokeWidth={1.7}
                className={active ? "text-[#1760e9]" : "text-[#111827]"}
              />
            </Link>
          );
        })}

        {/* Logout */}
        <button
          type="button"
          className="
            group flex min-h-[70px] w-full items-center
            gap-3 border-l-2 border-transparent
            bg-white px-4 text-left text-[#16345f]
            transition hover:bg-slate-50
          "
          onClick={() => {
            toggleModalConfirmLogout();
          }}
        >
          <LogOut size={25} strokeWidth={1.7} className="text-[#0f1e36]" />

          <span className="flex-1 font-medium">Đăng xuất</span>

          <ChevronRight
            size={23}
            strokeWidth={1.7}
            className="text-[#111827]"
          />
        </button>
      </nav>
    </aside>
  );
}
