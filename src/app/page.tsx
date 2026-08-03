import ListProducts from "@/components/ListProduct/ListProducts";
import { fetchAllProducts } from "@/services/productService";
import Link from "next/link";

export default async function Page() {
  const products = await fetchAllProducts();
  return (
    <div>
      <Link href="/test">test</Link>
      <ListProducts listProducts={products} />
    </div>
  );
}
