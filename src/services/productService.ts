export const fetchProductByCategory = async (
  slug: string,
  page: number,
  limit: number,
  filters?: {
    minPrice?: number;
    maxPrice?: number;
    gender?: string;
  },
) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("category", slug);

    if (filters?.minPrice !== undefined) {
      params.append("min_price", String(filters.minPrice));
    }

    if (filters?.maxPrice !== undefined) {
      params.append("max_price", String(filters.maxPrice));
    }

    if (filters?.gender) {
      params.append("gender", filters.gender);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?category=${slug}&page=${page}&limit=${limit}`,
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchProduct = async ({
  slug,
  page,
  limit,
  sortBy,
  order,
}: {
  slug?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
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
    console.log(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`,
    );
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`,
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`).then(
      (res) => res.json(),
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductById = async (id: number) => {
  try {
    // For demo purposes, we'll fetch all products and filter by ID
    // In a real app, this would be an API endpoint like /products/:id
    const allProducts = await fetchAllProducts();
    return allProducts.find((product: any) => product.id === id) || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
