export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string; // sau transform, category là string
  description: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  image_kit_file_id: string | null;
  images: string[]; // array of image URLs for the product gallery
  active: boolean;
  created_at: string;
}

// Response từ API /products/categories
export interface CategoriesResponse {
  categories: string[];
}

// Response từ API /products
export interface ProductsResponse {
  products: Product[];
}
