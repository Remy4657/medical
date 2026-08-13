import Breadcrumb from "@/components/BreadCrumb";
import { fetchAllFilters, fetchProduct } from "@/services/productService";
import ListProductsSlug from "@/components/listProduct/ListProductsSlug";
import { notFound } from "next/navigation";
import { fetchChildrenCategory } from "@/services/categoryService";
import ListChildrenCategory from "@/components/ListChildrenCategory";

type Props = {
  params: Promise<{
    slugs: string[];
  }>;
};

const page = async ({ params }: Props) => {
  const { slugs } = await params;
  const currentSlugPage = slugs.at(-1) as string;

  const productCategory = await fetchProduct({
    slug: currentSlugPage,
  });
  if (!productCategory) {
    notFound();
  }
  const { brands, countries } = await fetchAllFilters();
  const listChildrenCategory = await fetchChildrenCategory(currentSlugPage);

  return (
    <div>
      <Breadcrumb items={productCategory.breadcrumb} />

      {listChildrenCategory.length > 0 && (
        <ListChildrenCategory listChildrenCategory={listChildrenCategory} />
      )}
      <ListProductsSlug
        listBrandFilter={brands}
        listCountryFilter={countries}
        categorySlug={currentSlugPage}
        initialData={productCategory}
      />
    </div>
  );
};

export default page;
