export const fetchProduct = async ({
  slug,
  page,
  limit,
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
    console.log(
      `fetchProduct: ${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`,
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`,
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
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAllFilters = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/filters`,
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetailProduct = async (slug: string) => {
  try {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/product/?${slug}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
