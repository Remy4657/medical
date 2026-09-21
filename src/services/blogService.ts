const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBlogs(page = 1, limit = 8, category?: string) {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));

    if (category) {
      params.set("category", category);
    }
    const res = await fetch(`${API_URL}/blog?${params.toString()}`, {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await res.json();
    console.log("res.json()", data);
    return data.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blog/${slug}`, {
      next: {
        revalidate: 24 * 60 * 60, // 24 hours
      },
    });
    if (!res.ok) {
      throw new Error("Blog not found");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
