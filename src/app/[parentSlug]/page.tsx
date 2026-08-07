import Breadcrumb from "@/components/BreadCrumb";
import { fetchAllFilters, fetchProduct } from "@/services/productService";
import ListProductsSlug from "@/components/listProduct/ListProductsSlug";
import { notFound } from "next/navigation";
import { fetchChildrenCategory } from "@/services/categoryService";
import ListChildrenCategory from "@/components/ListChildrenCategory";

type Props = {
  params: Promise<{
    parentSlug: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { parentSlug } = await params;
  const productCategory = await fetchProduct({
    slug: parentSlug,
  });
  if (!productCategory) {
    notFound();
  }
  const { brands, countries } = await fetchAllFilters();
  const listChildrenCategory = await fetchChildrenCategory(parentSlug);
  const parentSlugName =
    productCategory.breadcrumb[productCategory.breadcrumb.length - 1]?.name;
  return (
    <div>
      <Breadcrumb items={productCategory.breadcrumb} />
      <ListChildrenCategory listChildrenCategory={listChildrenCategory} />
      <ListProductsSlug
        listBrandFilter={brands}
        listCountryFilter={countries}
        categorySlug={parentSlug}
        categoryName={parentSlugName}
        initialData={productCategory}
      />
    </div>
  );
};

export default page;
