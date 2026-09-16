import ListProductsBestSelling from "@/components/listProduct/ListProductsBestSelling";
import { fetchProduct } from "@/services/productService";

const page = async () => {
  const listProducts = await fetchProduct({
    sortBy: "bestSelling",
  });

  return <ListProductsBestSelling listProducts={listProducts} />;
};

export default page;
