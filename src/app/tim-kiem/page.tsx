import SearchResults from "@/components/search/SearchResults";
import { fetchAllFilters } from "@/services/productService";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const { brands, countries } = await fetchAllFilters();

  return (
    <SearchResults
      keyword={q}
      filterOptions={{ brands: brands, countries: countries }}
    />
  );
}
