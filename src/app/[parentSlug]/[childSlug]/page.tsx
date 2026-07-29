import Breadcrumb from "@/components/BreadCrumb";
import ListProducts from "@/components/product/ListProducts";
import { fetchProductByCategory } from "@/services/productService";

type Props = {
  params: Promise<{ childSlug: string }>;
};
async function page({ params }: Props) {
  const { childSlug } = await params;
  const { breadcrumb, products } = await fetchProductByCategory(childSlug);
  return (
    <div>
      <Breadcrumb items={breadcrumb} />
      <ListProducts listProducts={products} />;<div>slug</div>
    </div>
  );
}

export default page;
