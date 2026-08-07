import Breadcrumb from "@/components/BreadCrumb";
import ListProductsSlug from "@/components/listProduct/ListProductsSlug";
import {
  fetchAllFilters,
  fetchProduct,
  fetchProductByCategory,
} from "@/services/productService";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ childSlug: string }>;
};
async function page({ params }: Props) {
  const { childSlug } = await params;
  const productCategory = await fetchProduct({
    slug: childSlug,
  });
  if (!productCategory) {
    notFound();
  }
  const { brands, countries } = await fetchAllFilters();
  const childSlugName =
    productCategory.breadcrumb[productCategory.breadcrumb.length - 1]?.name;
  return (
    <div>
      <Breadcrumb items={productCategory.breadcrumb} />
      <ListProductsSlug
        listBrandFilter={brands}
        listCountryFilter={countries}
        categorySlug={childSlug}
        categoryName={childSlugName}
        initialData={productCategory}
      />
    </div>
  );
}

export default page;
