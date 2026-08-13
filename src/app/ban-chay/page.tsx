import ListProducts from "@/components/listProduct/ListProducts";
import { fetchProduct } from "@/services/productService";

const page = async () => {
  const listProducts = await fetchProduct({
    sortBy: "bestSelling",
    limit: 18,
  });

  return <ListProducts listProducts={listProducts} />;
};

export default page;
