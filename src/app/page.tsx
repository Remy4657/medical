import ListProductsCarousel from "@/components/listProduct/ListProductsCarousel";
import Slider from "@/components/Slider";
import {
  fetchAllProductsPromotion,
  fetchProduct,
} from "@/services/productService";
import { ChevronRight, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const { productsPromotion } = await fetchAllProductsPromotion();

  const { products } = await fetchProduct({ sortBy: "bestSelling" });
  return (
    <div>
      <Slider />
      <div className="flex flex-col mt-5 p-3 rounded-2xl bg-white">
        <div>
          <p className="flex flex-row px-5 py-2 text-white text-xl w-fit bg-primary rounded-t-2xl">
            <Flame />
            <span className="ml-1">Sản phẩm bán chạy</span>
          </p>
        </div>
        <ListProductsCarousel listProducts={products} isBestSelling={true} />
      </div>

      <div className="flex flex-col mt-5 p-3 rounded-2xl bg-white">
        <div className="mb-5">
          <Image
            src="/img/flashsale.webp"
            alt="image"
            width={1400}
            height={120}
          />
          {/* <p className="flex flex-row px-5 py-2 text-xl w-fit rounded-t-2xl">
            <Flame />
            <span className="ml-1">8:00 - 22:00, 12/08</span>
          </p> */}
        </div>
        <ListProductsCarousel
          listProducts={productsPromotion}
          isPromotion={true}
        />
      </div>
    </div>
  );
}
