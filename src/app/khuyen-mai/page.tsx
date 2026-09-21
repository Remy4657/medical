import ListProductsPromotion from "@/components/ListProduct/ListProductsPromotion";
import {
  fetchAllProductsPromotion,
  fetchProduct,
} from "@/services/productService";

const page = async () => {
  const listProducts = await fetchProduct({ isPromotion: true });
  return <ListProductsPromotion listProducts={listProducts} />;
};

export default page;
