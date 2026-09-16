export const fetchProduct = async ({
  slug,
  page,
  limit = 20,
  sortBy,
  order,
  brand = [],
  country = [],
  minPrice,
  maxPrice,
  isPromotion,
}: {
  slug?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
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

    if (slug) {
      params.set("category", slug);
    }
    if (page) {
      params.set("page", String(page));
    }
    if (limit) {
      params.set("limit", String(limit));
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
    if (isPromotion) {
      params.set("isPromotion", String(isPromotion));
    }
    brand.forEach((item: any) => {
      params.append("brand", item);
    });

    country.forEach((item: any) => {
      params.append("country", item);
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`,
      { cache: "force-cache" },
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
export const fetchAllProductsPromotion = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/promotions`,
      { cache: "force-cache" },
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.error("error: ", error);
  }
};
export const fetchAllFilters = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/filters`,
      { cache: "force-cache" },
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetailProduct = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
      { cache: "force-cache" },
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
