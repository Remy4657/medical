import Link from "next/link";
import { Music2, Phone, Mail } from "lucide-react";

const aboutLinks = [
  { label: "Giới thiệu", href: "#" },
  { label: "Tính BMI Online", href: "#" },
  { label: "Tính ngày dự sinh", href: "#" },
  { label: "Tính ngày rụng trứng", href: "#" },
];

const productLinks = [
  { label: "Chăm sóc sắc đẹp", href: "#" },
  { label: "Chăm sóc cá nhân", href: "#" },
  { label: "Thiết bị y tế", href: "#" },
  { label: "Thực phẩm chức năng", href: "#" },
  { label: "Sức khoẻ sinh sản", href: "#" },
  { label: "Thuốc", href: "#" },
  { label: "Hoạt chất và dược liệu", href: "#" },
  { label: "Tin tức", href: "#" },
];

const policyLinks = [
  { label: "Chính sách thanh toán", href: "#" },
  { label: "Chính sách xử lý khiếu nại", href: "#" },
  { label: "Chính sách vận chuyển và giao nhận", href: "#" },
  { label: "Chính sách đổi trả và hoàn tiền", href: "#" },
  { label: "Chính sách bảo hành", href: "#" },
  { label: "Chính sách bảo mật thông tin", href: "#" },
  { label: "Quy trình biên tập nội dung", href: "#" },
  { label: "Miễn trừ trách nhiệm nội dung", href: "#" },
];

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-gray-900">{title}</h3>

      <div className="border-t border-gray-200 pt-3">{children}</div>
    </div>
  );
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {links.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="text-[13px] text-gray-700 transition-colors hover:text-[#ed008c]"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="bg-base-100 px-5 xl:px-0">
      <div className="mx-auto max-w-7xl py-12">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2">
              {/* Logo icon */}
              <div className="relative h-9 w-9">
                <div className="absolute left-2 top-1 h-7 w-5 rotate-[25deg] rounded-full bg-[#ed008c]" />
                <div className="absolute left-0 top-3 h-2 w-6 rounded-full bg-[#ed008c]" />
                <div className="absolute left-1 top-6 h-1.5 w-4 rounded-full bg-[#ed008c]" />
              </div>

              <span className="text-[30px] font-bold tracking-tight text-[#ed008c]">
                AN SINH
              </span>
            </div>

            <p className="mt-1 text-[14px] font-medium text-[#ed008c]">
              Chuyên gia sức khoẻ 24/7
            </p>
          </Link>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-[1.05fr_1.1fr_1fr]">
          {/* Column 1 */}
          <div className="space-y-8">
            <FooterSection title="Về Medigo">
              <FooterLinks links={aboutLinks} />
            </FooterSection>

            <FooterSection title="Hỗ trợ">
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-700">Hotline miễn phí 24/7</span>

                  <a href="tel:18002247" className="font-medium text-[#ed008c]">
                    1800
                  </a>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-700">Email</span>

                  <a
                    href="mailto:cskh@medigoapp.com"
                    className="font-medium text-[#ed008c]"
                  >
                    cskh@.com
                  </a>
                </div>
              </div>
            </FooterSection>
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <FooterSection title="Danh mục sản phẩm">
              <FooterLinks links={productLinks} />
            </FooterSection>
          </div>

          {/* Column 3 */}
          <div className="space-y-8">
            <FooterSection title="Chính sách và quy định">
              <FooterLinks links={policyLinks} />
            </FooterSection>

            {/* Social */}
            <FooterSection title="Kết nối với chúng tôi">
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-[#1877f2] transition-opacity hover:opacity-70"
                >
                  {/* <Facebook size={26} fill="currentColor" /> */}
                </a>

                <a
                  href="#"
                  aria-label="Youtube"
                  className="text-red-600 transition-opacity hover:opacity-70"
                >
                  {/* <Youtube size={29} fill="currentColor" /> */}
                </a>

                <a
                  href="#"
                  aria-label="TikTok"
                  className="text-black transition-opacity hover:opacity-70"
                >
                  <Music2 size={25} />
                </a>
              </div>
            </FooterSection>

            {/* Certification */}
            <FooterSection title="Chứng nhận bởi">
              <div className="flex items-center pt-1">
                {/* Thay bằng ảnh chứng nhận thật của bạn */}
                <div className="flex h-12 items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-red-500 text-[8px] font-bold text-red-500">
                    ✓
                  </div>

                  <div className="rounded bg-red-600 px-2 py-1 text-center text-white">
                    <div className="text-[12px] font-bold leading-3">
                      ĐÃ ĐĂNG KÝ
                    </div>
                    <div className="text-[7px] leading-3">BỘ CÔNG THƯƠNG</div>
                  </div>
                </div>
              </div>
            </FooterSection>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-transparent pb-4 text-center text-[13px] leading-6 text-gray-500">
          {/* <p>
            © 2019 - 2023 Công Ty Trách Nhiệm Hữu Hạn Medigo Software Số ĐKKD
            0315807012 do Sở
          </p> */}

          {/* <p>Quầy thuốc An Sinh</p>

          <p className="mt-2">Địa chỉ:</p> */}

          {/* <div className="mt-1 flex flex-wrap justify-center gap-x-12 gap-y-1">
            <span>
              Hotline:{" "}
              <a href="tel:18002247" className="font-medium text-[#ed008c]">
                1800 2247
              </a>
            </span>

            <span>
              Email:{" "}
              <a
                href="mailto:cskh@medigoapp.com"
                className="font-medium text-[#ed008c]"
              >
                cskh@medigoapp.com
              </a>
            </span>

            <span>Đại diện pháp luật: Lê Hữu Hà</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
