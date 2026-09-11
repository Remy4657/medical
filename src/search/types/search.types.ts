export interface SearchProductItem {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  price: {
    originalPrice: string;
    salePrice: string;
  } | null;
  unit: {
    id: number;
    name: string;
    code: string;
  } | null;
}

export interface SearchCategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface SearchSuggestResponse {
  keywordSuggestions: string[];
  categories: SearchCategoryItem[];
  products: SearchProductItem[];
  total: number;
}

export interface SearchResultResponse {
  items: SearchProductItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
