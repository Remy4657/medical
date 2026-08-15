import ListProductsNoFilter from "@/components/listProduct/ListProductsNoFilter";
import { fetchProduct } from "@/services/productService";

const page = async () => {
  const listProducts = await fetchProduct({
    sortBy: "bestSelling",
    limit: 18,
  });

  return <ListProductsNoFilter listProducts={listProducts} />;
};

export default page;
