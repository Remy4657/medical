// types/blog.ts

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogImage {
  id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  sortOrder: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail: string | null;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string | null;
  category: BlogCategory | null;
  content?: Record<string, any>;
  images?: BlogImage[];
}

export interface BlogListResponse {
  items: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
