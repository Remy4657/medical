import Breadcrumb from "@/components/BreadCrumb";
import {
  fetchProduct,
  fetchProductByCategory,
} from "@/services/productService";
import ListProductsSlug from "@/components/listProduct/ListProductsSlug";

type Props = {
  params: Promise<{
    parentSlug: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { parentSlug } = await params;
  const productCategory = await fetchProduct({ slug: parentSlug });

  const parentSlugName =
    productCategory.breadcrumb[productCategory.breadcrumb.length - 1].name;
  return (
    <div>
      <Breadcrumb items={productCategory.breadcrumb} />
      <ListProductsSlug
        categorySlug={parentSlug}
        categoryName={parentSlugName}
        initialData={productCategory}
      />
    </div>
  );
};

export default page;
