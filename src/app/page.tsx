import ListProducts from "@/components/listProduct/ListProducts";
import { fetchProduct } from "@/services/productService";
import Link from "next/link";

export default async function Page() {
  const { products } = await fetchProduct({ sortBy: "bestSelling" });
  return (
    <div>
      <Link href="/test">test</Link>
      <ListProducts listProducts={products} />
    </div>
  );
}
