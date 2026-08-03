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
