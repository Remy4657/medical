import Breadcrumb from "@/components/BreadCrumb";
import ListProductsSlug from "@/components/listProduct/ListProductsSlug";
import {
  fetchProduct,
  fetchProductByCategory,
} from "@/services/productService";

type Props = {
  params: Promise<{ childSlug: string }>;
};
async function page({ params }: Props) {
  const { childSlug } = await params;
  const productCategory = await fetchProduct({ slug: childSlug });
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
