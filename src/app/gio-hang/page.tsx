import Cart from "@/components/Cart";
import { notFound } from "next/navigation";

const page = async () => {
  try {
    const { provinces } = await fetch(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
      { credentials: "include" },
    ).then((res) => res.json());

    // const { communes } = await fetch(
    //   "https://production.cas.so/address-kit/2025-07-01/provinces/15/communes",
    //   { credentials: "include" },
    // ).then((res) => res.json());

    // console.log("communes: ", communes);

    return <Cart provinces={provinces} />;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tỉnh: ", error);
    return notFound();
  }
};

export default page;
