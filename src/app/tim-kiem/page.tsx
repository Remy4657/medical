import ListProductsSearch from "@/components/ListProduct/ListProductsSearch";
import { fetchAllFilters } from "@/services/productService";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";

  const { brands, countries } = await fetchAllFilters();

  return (
    <div className="mt-5">
      <ListProductsSearch
        keyword={q}
        listBrandFilter={brands}
        listCountryFilter={countries}
      />
    </div>
  );
}
