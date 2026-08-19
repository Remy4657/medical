export type Product = {
  id: number;
  slug: string;
  name: string;
  category: Category; // sau transform, category là string
  description: string;
  country: Country;
  bestVariant: any;
  images: any; // array of image URLs for the product gallery
};
export type Variant = {
  price: Price;
  unit: Unit;
};
export type Category = {
  name: string;
};
export type Unit = {
  name: string;
};
export type Country = {
  name: string;
};
export type Price = {
  originalPrice: string;
  salePrice: string;
};
// Response từ API /products/categories
export type CategoriesResponse = {
  categories: string[];
};

// Response từ API /products
export type ProductsResponse = {
  products: Product[];
};
