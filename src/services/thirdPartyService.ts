import api from "@/lib/api";

export const getProvinces = async () => {
  try {
    const res = await api.get(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
    );

    return res.data.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách tỉnh:", error);
    throw error;
  }
};
export const getWards = async (provinceCode: string) => {
  try {
    const res = await api.get(
      `https://production.cas.so/address-kit/2025-07-01/provinces/${provinceCode}/communes`,
    );

    return res.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách xã", error);
    throw error;
  }
};
