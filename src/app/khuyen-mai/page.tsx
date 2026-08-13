import ListProducts from "@/components/listProduct/ListProducts";
import {
  fetchAllProductsPromotion,
  fetchProduct,
} from "@/services/productService";

const page = async () => {
  const { productsPromotion } = await fetchAllProductsPromotion();

  return <ListProducts listProducts={productsPromotion} />;
};

export default page;
