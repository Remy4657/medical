import Breadcrumb from "@/components/BreadCrumb";
import ListProducts from "@/components/product/ListProducts";
import { fetchProductByCategory } from "@/services/productService";

type Props = {
  params: Promise<{
    parentSlug: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { parentSlug } = await params;
  const { breadcrumb, products } = await fetchProductByCategory(parentSlug);
  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <ListProducts listProducts={products} />;<div>slug</div>
      <div>page</div>
    </div>
  );
};

export default page;
