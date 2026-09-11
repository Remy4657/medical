import api from "@/lib/api";

export const searchSuggestService = async (keyword: string) => {
  try {
    const params = new URLSearchParams({
      q: keyword,
    });
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search/suggest?${params.toString()}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
export const searchProductsService = async (keyword: string) => {
  try {
    const params = new URLSearchParams({
      q: keyword,
    });
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?${params.toString()}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
