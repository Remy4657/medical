"use client";
import { useSearchProducts } from "@/hooks/useSearch";
import ListProductsSlug from "../listProduct/ListProductsSlug";
import Loading from "../Loading";
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
  const { brands, countries } = filterOptions;
  const { data, isPending, isError } = useSearchProducts(keyword);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>Có lỗi xảy ra</div>;
  }
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
