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

export const searchProductsService = async ({
  keywordSearch,
  page,
  sortBy,
  order,
  brand = [],
  country = [],
  minPrice,
  maxPrice,
}: {
  keywordSearch: string;
  sortBy?: string;
  page?: number;
  order?: string;
  brand?: string[];
  country?: string[];
  minPrice?: number;
  maxPrice?: number;
  isPromotion?: boolean;
}) => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const params = new URLSearchParams();

    if (keywordSearch) {
      params.set("q", keywordSearch);
    }
    if (page) {
      params.set("page", String(page));
    }
    if (sortBy) {
      params.set("sortBy", sortBy);
    }

    if (order) {
      params.set("order", order);
    }
    if (minPrice) {
      params.set("minPrice", String(minPrice));
    }

    if (maxPrice) {
      params.set("maxPrice", String(maxPrice));
    }
    brand.forEach((item: any) => {
      params.append("brand", item);
    });

    country.forEach((item: any) => {
      params.append("country", item);
    });

    const response = await api.get(`/search?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
