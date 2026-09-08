"use client";

import { usePathname } from "next/navigation";
import Breadcrumb from "../BreadCrumb";

const breadcrumbMap: Record<string, string> = {
  "/ca-nhan/don-hang-cua-toi": "Đơn hàng của tôi",
  "/ca-nhan/thong-tin-ca-nhan": "Thông tin cá nhân",
};

export default function AccountBreadcrumb() {
  const pathname = usePathname();
  console.log("pathname: ", pathname);

  const current = breadcrumbMap[pathname] ?? "Đơn hàng của tôi";

  return (
    <Breadcrumb
      items={[
        {
          name: current,
          slug: pathname,
        },
      ]}
    />
  );
}
