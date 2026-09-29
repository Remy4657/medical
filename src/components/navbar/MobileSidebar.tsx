"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import MobileAccountMenu from "./MobileAccountMenu";

const MobileSidebar = ({ listCategories }: { listCategories: any }) => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  const handleNavigate = () => {
    const menu = document.getElementById("mobile-menu") as HTMLInputElement;

    menu.checked = false;
  };

  const toggleCategory = (id: number) => {
    setOpenCategory((current) => (current === id ? null : id));
  };

  return (
    <div className="drawer md:hidden">
      {/* =====================================================
          DRAWER STATE
          DaisyUI dùng checkbox để quản lý mở / đóng sidebar
      ===================================================== */}
      <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

      {/* =====================================================
          DRAWER CONTENT
          Đây là phần bên ngoài sidebar
      ===================================================== */}
      <div className="drawer-content">
        <label
          htmlFor="mobile-menu"
          className="btn btn-ghost px-0 text-white"
          aria-label="Mở menu"
        >
          <Menu size={26} />
        </label>
      </div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <div className={`drawer-side z-100`}>
        {/* Click vùng này => đóng sidebar */}
        <label
          htmlFor="mobile-menu"
          aria-label="Đóng menu"
          className="drawer-overlay"
        />
        <aside className="flex min-h-full w-80 max-w-[85vw] flex-col bg-base-100 text-base-content">
          {/* =================================================
              HEADER SIDEBAR
          ================================================= */}
          <div className="flex h-16 items-center justify-between border-b  border-base-200 px-4">
            <div>
              <Link
                href="/"
                className="btn p-0 btn-ghost gap-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl flex"
                onClick={handleNavigate}
              >
                {/* Logo icon */}
                <div className="relative h-9 w-9">
                  <div className="absolute left-2 top-1 h-7 w-5 rotate-[25deg] rounded-full bg-[#ed008c]" />
                  <div className="absolute left-0 top-3 h-2 w-6 rounded-full bg-[#ed008c]" />
                  <div className="absolute left-1 top-6 h-1.5 w-4 rounded-full bg-[#ed008c]" />
                </div>
                <span className="invisible xs:visible leading-non text-base-content">
                  An Sinh
                </span>
              </Link>
            </div>
            <label
              htmlFor="mobile-menu"
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Đóng menu"
            >
              <X size={22} />
            </label>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}
          <div className="flex-1 overflow-y-auto p-3">
            <MobileAccountMenu />
            <ul className="menu w-full p-0">
              {listCategories?.map((p: any) => {
                const hasChildren = p.children?.length > 0;
                const isOpen = openCategory === p.id;

                return (
                  <li key={p.id}>
                    {/* Parent category */}
                    <div className="flex w-full items-center p-0">
                      {/* Click tên => navigate + close sidebar */}
                      <Link
                        href={`/danh-muc/${p.slug}`}
                        onClick={handleNavigate}
                        className="flex-1 px-3 py-3 text-base font-medium"
                      >
                        {p.name}
                      </Link>

                      {/* Click chevron => expand/collapse */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleCategory(p.id)}
                          className="btn btn-ghost btn-sm px-0"
                          aria-label={`Mở ${p.name}`}
                        >
                          <ChevronDown
                            size={18}
                            className={`
                            transition-transform duration-300
                            ${isOpen ? "rotate-180" : ""}
                          `}
                          />
                        </button>
                      )}
                    </div>

                    {/* Children */}
                    {hasChildren && (
                      <ul
                        className={`
                        overflow-hidden
                        transition-all duration-300
                        ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                      `}
                      >
                        {p.children!.map((c: any) => (
                          <li key={c.id}>
                            <Link
                              href={`/danh-muc/${p.slug}/${c.slug}`}
                              onClick={handleNavigate}
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* =============================================
                Các link điều hướng khác
            ============================================== */}
            <div className="divider my-3" />
            {/* <ul className="menu w-full p-0">
              <li>
                <Link href="/danh-muc">Tất cả danh mục</Link>
              </li>

              <li>
                <Link href="/san-pham">Sản phẩm</Link>
              </li>

              <li>
                <Link href="/blog">Blog</Link>
              </li>

              <li>
                <Link href="/lien-he">Liên hệ</Link>
              </li>
            </ul> */}
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}
          <div className=" p-4">
            {/* <Link href="/" className="text-sm text-base-content/60">
              Trang chủ
            </Link> */}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MobileSidebar;
