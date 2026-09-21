import api from "@/lib/api";

export const searchSuggestService = async (keyword: string) => {
  try {
    const params = new URLSearchParams({
      q: keyword,
    });
    const response = await api.get(`/search/suggest`, { params });
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
    const response = await api.get(`/search?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
