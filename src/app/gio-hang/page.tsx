import Cart from "@/components/Cart";
import { toast } from "sonner";

const page = async () => {
  try {
    const res = await fetch(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
      { credentials: "include" },
    );
    if (!res.ok) {
      //throw new Error(`Request failed: ${res.status}`);
      toast.error("Lỗi khi lấy danh sách tỉnh");
    }
    const { provinces } = await res.json();

    return <Cart provinces={provinces} />;
  } catch (error) {
    toast.error("Lỗi khi lấy danh sách tỉnh");
    console.log("Lỗi khi lấy danh sách tỉnh: ", error);
    //throw new Error("Lỗi khi lấy danh sách tỉnh"); // throw để rơi vào trang error.tsx
  }
};

export default page;
