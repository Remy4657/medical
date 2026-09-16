import Cart from "@/components/Cart";

const page = async () => {
  try {
    const res = await fetch(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
      { credentials: "include" },
    );
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    const { provinces } = await res.json();

    return <Cart provinces={provinces} />;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tỉnh: ", error);
    throw new Error("Lỗi khi lấy danh sách tỉnh");
  }
};

export default page;
