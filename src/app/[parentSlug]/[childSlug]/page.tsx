import Breadcrumb from "@/components/BreadCrumb";
import ListProductsSlug from "@/components/ListProduct/ListProductsSlug";
import { fetchProductByCategory } from "@/services/productService";

type Props = {
  params: Promise<{ childSlug: string }>;
};
async function page({ params }: Props) {
  const { childSlug } = await params;
  const productCategory = await fetchProductByCategory(childSlug, 1, 15);
  const childSlugName =
    productCategory.breadcrumb[productCategory.breadcrumb.length - 1].name;
  return (
    <div>
      <Breadcrumb items={productCategory.breadcrumb} />
      <ListProductsSlug
        categorySlug={childSlug}
        categoryName={childSlugName}
        initialData={productCategory}
      />
    </div>
  );
}

export default page;
