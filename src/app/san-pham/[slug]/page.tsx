import { notFound } from "next/navigation";

import Link from "next/link";
import EmblaCarouselThumbs from "@/components/EmblaCarouselThumbs";
import { fetchProduct, fetchProductBySlug } from "@/services/productService";
import { calculateDiscountPercent, formatPrice } from "@/utils/formatPrice";
import Breadcrumb from "@/components/BreadCrumb";
import ListProductsCarousel from "@/components/listProduct/ListProductsCarousel";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productDetail = await fetchProductBySlug(slug);
  console.log("productDetail: ", productDetail);

  const slugCate = productDetail.breadcrumb.at(-1).slug;

  const { products } = await fetchProduct({
    slug: slugCate,
  });
  if (!productDetail) return notFound();

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

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-4">{productDetail.name}</h1>

          <div className="flex flex-col items-baseline space-x-4 mb-6 ">
            {calculateDiscountPercent(
              productDetail.variants[0]?.price?.originalPrice,
              productDetail.variants[0]?.price.salePrice,
            ) > 0 ? (
              <span className=" text-primary">
                <span className="font-semibold text-3xl">
                  {formatPrice(productDetail.variants[0]?.price.salePrice)}
                </span>{" "}
                /{" "}
                <span className="text-xl">
                  {productDetail.variants[0]?.unit.name}
                </span>
              </span>
            ) : (
              <span className="text-2xl text-primary">Liên hệ</span>
            )}

            {calculateDiscountPercent(
              productDetail.variants[0]?.price?.originalPrice,
              productDetail.variants[0]?.price.salePrice,
            ) > 0 && (
              <div className="flex flex-row mt-3 gap-5">
                <span className="line-through text-2xl text-gray-500">
                  {formatPrice(productDetail.variants[0]?.price?.originalPrice)}
                </span>
                <p className="rounded-sm bg-red-600 text-md text-white px-1.5 content-center">
                  -
                  {calculateDiscountPercent(
                    productDetail.variants[0]?.price?.originalPrice,
                    productDetail.variants[0]?.price.salePrice,
                  )}
                  %
                </p>
              </div>
            )}
            {/* Đơn vị tính */}
            <div className="flex mt-5 items-center justify-between">
              <span className="text-gray-700 text-lg">Chọn đơn vị tính</span>

              <div className="ml-5 flex flex-row gap-3">
                {productDetail.variants.map((item: any, index: number) => (
                  <button
                    key={item.id}
                    className={`py-2 cursor-pointer border rounded-full px-4 ${index == 0 ? "border-primary text-primary" : "btn-accent"}`}
                  >
                    {item.packageDescription}
                  </button>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="flex mt-5 items-center justify-between">
              <span className="text-gray-700 text-lg">Chọn số lượng</span>

              <div className="join h-10 ml-5 overflow-hidden rounded-full border border-base-300">
                <button
                  type="button"
                  // onClick={decrease}
                  // disabled={quantity <= 1}
                  className="btn btn-ghost join-item h-full min-h-0 w-11 rounded-none px-0 disabled:bg-transparent"
                >
                  −
                </button>

                <span className="flex w-11 items-center justify-center border-x border-base-300 text-base">
                  1
                </span>

                <button
                  type="button"
                  // onClick={increase}
                  className="btn btn-ghost join-item h-full min-h-0 w-11 rounded-none px-0"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-baseline space-x-4 mb-6">
            <button className="btn btn-outline hover:bg-none btn-primary rounded-full">
              Thêm vào giỏ hàng
            </button>
            <button className="btn  btn-primary rounded-full">Mua ngay</button>
          </div>
          <div>
            <p>
              <span className="font-medium">Mô tả: </span>
              {productDetail.description}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="font-medium w-[60px]">Xuất xứ: </span>
                <span className=""> {productDetail.country}</span>
              </div>
              <div className="flex flex-row">
                <span className="font-medium w-[100px]">Thương hiệu: </span>
                <span className=""> {productDetail.brand}</span>
              </div>
            </div>
          </div>
        </div>
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
