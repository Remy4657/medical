import { notFound } from "next/navigation";

import EmblaCarouselThumbs from "@/components/carousel/EmblaCarouselThumbs";
import { fetchProduct, fetchDetailProduct } from "@/services/productService";
import Breadcrumb from "@/components/BreadCrumb";
import ListProductsCarousel from "@/components/ListProduct/ListProductsCarousel";
import DetailProductAction from "@/components/DetailProductAction";

export async function generateStaticParams() {
  return []; // không dứng trước page nào khi buil, chi cache khi trang được user truy cập
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productDetail = await fetchDetailProduct(slug);
  if (!productDetail) return notFound();
  const slugCate = productDetail.breadcrumb.at(-1).slug;

  const { products } = await fetchProduct({
    slug: slugCate,
  });

  return (
    <div className="mx-auto">
      <Breadcrumb
        items={productDetail.breadcrumb}
        nameProduct={productDetail.name}
      />

      {/* Product Layout: Image Gallery + Info */}
      <div className="bg-base-0 mt-5 p-5 rounded-none sm:rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-8 -mx-4 sm:mx-0">
        {/* Product Gallery */}
        <div className="lg:pr-8">
          <EmblaCarouselThumbs images={productDetail.images} />
        </div>

        <DetailProductAction productDetail={productDetail} />
      </div>

      <div className="bg-base-0 p-5 mt-5 rounded-none sm:rounded-lg -mx-4 sm:mx-0">
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

      <div className="bg-base-0 p-5 mt-5 rounded-none sm:rounded-lg -mx-4 sm:mx-0">
        <h1 className="mb-3">Sản phẩm liên quan</h1>
        <ListProductsCarousel listProducts={products} />
      </div>
    </div>
  );
}
