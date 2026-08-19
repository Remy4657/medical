import Cart from "@/components/Cart";
import { notFound } from "next/navigation";

const page = async () => {
  try {
    const { provinces } = await fetch(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
    ).then((res) => res.json());
    return <Cart provinces={provinces} />;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tỉnh: ", error);
    return notFound();
  }
};

export default page;
