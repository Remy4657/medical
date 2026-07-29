import ListProducts from "@/components/product/ListProducts";
import { fetchAllProducts } from "@/services/productService";

export default async function Page() {
  const products = await fetchAllProducts();
  return (
    <div>
      <ListProducts listProducts={products} />;
    </div>
  );
}
