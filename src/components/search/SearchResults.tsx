"use client";
import { useSearchProducts } from "@/hooks/useSearch";
import ListProductsSlug from "../listProduct/ListProductsSlug";
type SearchResultsProps = {
  keyword: string;
  filterOptions: {
    brands: any[];
    countries: any[];
  };
};
export default function SearchResults({
  keyword,
  filterOptions,
}: SearchResultsProps) {
  console.log("keyword: ", keyword);
  const { brands, countries } = filterOptions;
  const { data, isLoading, isError } = useSearchProducts(keyword);

  if (isLoading) {
    return <div>Đang tìm kiếm...</div>;
  }

  if (isError) {
    return <div>Có lỗi xảy ra</div>;
  }
  console.log("data: ", data);
  return (
    <div className="mt-5">
      <ListProductsSlug
        isSearching={true}
        listBrandFilter={brands}
        listCountryFilter={countries}
        initialData={data}
      />
    </div>
  );
}
