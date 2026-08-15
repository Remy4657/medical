import ListProductsPromotion from "@/components/listProduct/ListProductsPromotion";
import {
  fetchAllProductsPromotion,
  fetchProduct,
} from "@/services/productService";

const page = async () => {
  const listProducts = await fetchProduct({ isPromotion: true });
  return <ListProductsPromotion listProducts={listProducts} />;
};

export default page;
