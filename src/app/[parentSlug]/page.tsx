import Breadcrumb from "@/components/BreadCrumb";
import { fetchProductByCategory } from "@/services/productService";
import ListProductsSlug from "@/components/ListProduct/ListProductsSlug";

type Props = {
  params: Promise<{
    parentSlug: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { parentSlug } = await params;
  const productCategory = await fetchProductByCategory(parentSlug, 1, 15);
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
