import api from "@/lib/api";

export const getProvinces = async () => {
  try {
    const res = await api.get(
      "https://production.cas.so/address-kit/2025-07-01/provinces",
    );

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
