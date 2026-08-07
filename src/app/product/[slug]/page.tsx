import { notFound } from "next/navigation";

import Link from "next/link";
import EmblaCarouselThumbs from "@/components/EmblaCarouselThumbs";
import { fetchProductBySlug } from "@/services/productService";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productDetail = await fetchProductBySlug(slug);
  console.log("productDetail: ", productDetail);
  if (!productDetail) return notFound();

  return (
    <div className="mx-auto py-8">
      {/* Product Layout: Image Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div className="lg:pr-8">
          <EmblaCarouselThumbs />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{productDetail.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">
            {productDetail.category}
          </p>

          <p className="text-gray-600 mb-6">{productDetail.description}</p>

          <div className="flex items-baseline space-x-4 mb-6">
            <span className="text-2xl font-bold">
              {productDetail.variants[0]?.price.salePrice.toLocaleString()} ₫
            </span>
          </div>

          <div className="flex items-baseline space-x-4 mb-6">
            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
            <button className="btn btn-outline">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
}
