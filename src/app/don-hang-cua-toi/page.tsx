import Breadcrumb from "@/components/BreadCrumb";
import {
  UserRound,
  Package,
  MapPin,
  Syringe,
  FileText,
  FilePlus2,
  LogOut,
  ChevronRight,
  Search,
  Box,
  Plane,
} from "lucide-react";

const menuItems = [
  {
    label: "Thông tin cá nhân",
    icon: UserRound,
  },
  {
    label: "Đơn hàng của tôi",
    icon: Package,
    active: true,
  },
  {
    label: "Quản lý sổ địa chỉ",
    icon: MapPin,
  },
  {
    label: "Lịch hẹn tiêm chủng",
    icon: Syringe,
  },
  {
    label: "Đơn hàng tiêm chủng",
    icon: FileText,
  },
  {
    label: "Đơn thuốc của tôi",
    icon: FilePlus2,
  },
  {
    label: "Đăng xuất",
    icon: LogOut,
  },
];

const tabs = [
  "Tất cả",
  "Đang xử lý",
  "Đang giao",
  "Đã giao",
  "Đã hủy",
  "Trả hàng",
];

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen text-[#10254a]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ name: "Đơn hàng của tôi", slug: "/" }]} />

        {/* Main layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[362px_minmax(0,1fr)]">
          {/* ================= SIDEBAR ================= */}
          <aside>
            {/* Profile card */}
            <div className="relative mb-5 h-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#2772ee] to-[#1d58dc] shadow-sm">
              {/* Decorative circles */}
              <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -right-12 bottom-[-30px] h-40 w-40 rounded-full bg-white/5" />

              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="mb-3 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white/20 ring-1 ring-white/20">
                  <UserRound
                    size={45}
                    strokeWidth={1.5}
                    className="text-white/90"
                  />
                </div>

                <div className="text-[19px] font-semibold text-white">
                  Anh Đạt
                </div>

                <div className="mt-1 text-[15px] font-medium text-white">
                  0378404595
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={[
                      "group flex min-h-[70px] w-full items-center gap-3 border-l-2 px-4 text-left transition",
                      item.active
                        ? "border-[#1760e9] bg-[#eef1f5] text-[#1760e9]"
                        : "border-transparent bg-white text-[#16345f] hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      className={
                        item.active ? "text-[#1760e9]" : "text-[#0f1e36]"
                      }
                    />

                    <span className="flex-1 text-[17px] font-medium">
                      {item.label}
                    </span>

                    <ChevronRight
                      size={23}
                      strokeWidth={1.7}
                      className={
                        item.active ? "text-[#1760e9]" : "text-[#111827]"
                      }
                    />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ================= CONTENT ================= */}
          <main className="min-w-0">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <h1 className="text-[24px] font-bold text-[#07162f]">
                Đơn hàng của tôi
              </h1>

              {/* Search */}
              <div className="relative w-full xl:max-w-[620px]">
                <input
                  type="text"
                  placeholder="Tìm theo tên đơn, mã đơn, hoặc tên sản phẩm..."
                  className="input h-[56px] w-full rounded-full border-0 bg-[#dfe4ea] pl-5 pr-16 text-[16px] text-[#17335d] outline-none placeholder:text-[#6c7d94] focus:bg-[#d9dfe6] focus:outline-none"
                />

                <button
                  type="button"
                  className="absolute right-1 top-2 flex h-[40] w-[40] items-center justify-center rounded-full text-[#1456d9] transition hover:bg-[#a9bff9]"
                >
                  <Search size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="overflow-x-auto rounded-t-2xl bg-white scrollbar-none">
              <div className="flex min-w-[680px]">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={[
                      "relative flex h-[50px] flex-1 items-center justify-center whitespace-nowrap px-5 text-[17px] font-medium transition",
                      index === 0
                        ? "text-[#111827]"
                        : "text-[#68788e] hover:text-[#1760e9]",
                    ].join(" ")}
                  >
                    {tab}

                    {index === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1760e9]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty state */}
            <section className="flex min-h-[620px] flex-col items-center justify-center bg-[#eef1f5] px-4 py-12">
              {/* Illustration */}
              <div className="relative mb-7 h-[185px] w-[270px]">
                {/* Shadow */}
                <div className="absolute bottom-1 left-1/2 h-[38px] w-[240px] -translate-x-1/2 rounded-[50%] bg-[#cbd2dc]" />

                {/* Flying paper */}
                <div className="absolute right-[76px] top-0 rotate-[25deg]">
                  <Plane
                    size={29}
                    strokeWidth={1.4}
                    className="fill-[#cbd2dc] text-[#b8c1cf]"
                  />
                </div>

                {/* Dotted flight path */}
                <svg
                  className="absolute right-[73px] top-[20px]"
                  width="65"
                  height="120"
                  viewBox="0 0 65 120"
                  fill="none"
                >
                  <path
                    d="M18 0C51 17 55 49 38 66C23 81 6 73 5 88C4 101 20 109 31 116"
                    stroke="#c1c9d5"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                </svg>

                {/* Box */}
                <div className="absolute bottom-[30px] left-1/2 h-[72px] w-[104px] -translate-x-1/2">
                  {/* Back/top */}
                  <div className="absolute left-[5px] top-0 h-[40px] w-[94px] skew-x-[28deg] rounded-sm bg-[#c5ccd7]" />

                  {/* Front */}
                  <div className="absolute bottom-0 left-[20px] h-[48px] w-[70px] bg-[#d5dbe4]">
                    <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#c0c8d4]" />
                  </div>

                  {/* Left flap */}
                  <div className="absolute left-0 top-[4px] h-[34px] w-[48px] -skew-y-[22deg] bg-[#bfc7d3]" />

                  {/* Right flap */}
                  <div className="absolute right-0 top-[4px] h-[34px] w-[48px] skew-y-[22deg] bg-[#cbd2dc]" />
                </div>
              </div>

              <h2 className="text-center text-[22px] font-bold text-[#3e526e]">
                Bạn chưa có đơn hàng nào.
              </h2>

              <p className="mt-2 max-w-[510px] text-center text-[17px] leading-7 text-[#61748e]">
                Cùng khám phá hàng ngàn sản phẩm
                <br className="hidden sm:block" />
                tại Nhà thuốc FPT Long Châu nhé!
              </p>

              <button
                type="button"
                className="btn mt-5 h-[60px] min-h-0 rounded-full border-0 bg-[#2865e5] px-8 text-[17px] font-bold text-white shadow-none hover:bg-[#1956d4]"
              >
                Khám phá ngay
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
