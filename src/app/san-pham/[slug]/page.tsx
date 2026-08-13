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
          <h1 className="text-3xl font-bold mb-4">{productDetail.name}</h1>

          <div className="flex flex-col items-baseline space-x-4 mb-6">
            {calculateDiscountPercent(
              productDetail.variants[0]?.price?.originalPrice,
              productDetail.variants[0]?.price.salePrice,
            ) > 0 ? (
              <span className="text-2xl">
                {formatPrice(productDetail.variants[0]?.price.salePrice)}/
                {productDetail.variants[0]?.unit.name}
              </span>
            ) : (
              <span className="text-2xl">Liên hệ</span>
            )}

            {calculateDiscountPercent(
              productDetail.variants[0]?.price?.originalPrice,
              productDetail.variants[0]?.price.salePrice,
            ) > 0 && (
              <div className="flex flex-row text-2xl gap-5">
                <span className="line-through text-md ">
                  {formatPrice(productDetail.variants[0]?.price?.originalPrice)}
                </span>
                <span>
                  -
                  {calculateDiscountPercent(
                    productDetail.variants[0]?.price?.originalPrice,
                    productDetail.variants[0]?.price.salePrice,
                  )}
                  %
                </span>
              </div>
            )}
            <div className="space-y-5">
              {/* Đơn vị tính */}
              <div className="flex items-center justify-between">
                <span className="text-base text-base-content">
                  Chọn đơn vị tính
                </span>

                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    type="button"
                    className="btn btn-outline btn-primary h-11 min-h-11 w-24 rounded-full px-4 text-base font-normal"
                  >
                    <span className="flex-1">chai</span>

                    {/* Arrow */}
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu z-50 mt-2 w-32 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
                  >
                    {["hộp", "chai"].map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          // onClick={() => setUnit(item)}
                          className={"chai" === item ? "active" : ""}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Số lượng */}
              <div className="flex items-center justify-between">
                <span className="text-base text-base-content">
                  Chọn số lượng
                </span>

                <div className="join h-10 overflow-hidden rounded-full border border-base-300">
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
          </div>

          <div className="flex items-baseline space-x-4 mb-6">
            <button className="btn btn-primary">Thêm vào giỏ hàng</button>
            <button className="btn btn-outline">Mua ngay</button>
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
