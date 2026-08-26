import { notFound } from "next/navigation";

import Link from "next/link";
import EmblaCarouselThumbs from "@/components/carousel/EmblaCarouselThumbs";
import { fetchProduct, fetchDetailProduct } from "@/services/productService";
import { calculateDiscountPercent, formatPrice } from "@/utils/formatPrice";
import Breadcrumb from "@/components/BreadCrumb";
import ListProductsCarousel from "@/components/listProduct/ListProductsCarousel";
import DetailProductAction from "@/components/DetailProductAction";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productDetail = await fetchDetailProduct(slug);
  console.log("productDetail: ", productDetail);
  if (!productDetail) return notFound();
  const slugCate = productDetail.breadcrumb.at(-1).slug;

  const { products } = await fetchProduct({
    slug: slugCate,
  });

  return (
    <div className="mx-auto py-8">
      <Breadcrumb
        items={productDetail.breadcrumb}
        nameProduct={productDetail.name}
      />

      {/* Product Layout: Image Gallery + Info */}
      <div className="bg-base-0 p-5 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div className="lg:pr-8">
          <EmblaCarouselThumbs images={productDetail.images} />
        </div>

        <DetailProductAction productDetail={productDetail} />
      </div>

      <div className="bg-base-0 p-5 mt-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">Thông tin sản phẩm</span>
          {productDetail.attributes.map((item: any) => (
            <div key={item.id} className="flex flex-row">
              <span className="font-medium flex-1">{item.name}</span>
              <span className="flex-4 whitespace-pre-line text-sm leading-7">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-base-0 p-5 mt-5 rounded-lg">
        <ListProductsCarousel listProducts={products} />
      </div>
    </div>
  );
}
