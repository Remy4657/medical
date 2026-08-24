"use client";
import { calculateDiscountPercent, formatPrice } from "@/utils/formatPrice";
import { Check } from "lucide-react";
import { useState } from "react";
import { useCommonStore } from "@/stores/useCommonStore";
import { useCart } from "@/hooks/useCart";

type Props = {
  productDetail: any;
};

const DetailProductAction = ({ productDetail }: Props) => {
  const { addToCart } = useCart();

  const { toggleModal } = useCommonStore();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(
      {
        variantId: productDetail.variants[selectedVariantIndex].id,
        productId: productDetail.id,

        productName: productDetail.name,
        sku: productDetail.variants[selectedVariantIndex].sku,
        packageDescription:
          productDetail.variants[selectedVariantIndex].packageDescription,

        image: productDetail.images[0]?.url ?? null,

        unit: {
          id: productDetail.variants[selectedVariantIndex].unit.id,
          name: productDetail.variants[selectedVariantIndex].unit.name,
          code: productDetail.variants[selectedVariantIndex].unit.code,
        },

        price: {
          originalPrice:
            productDetail.variants[selectedVariantIndex].price.originalPrice,
          salePrice:
            productDetail.variants[selectedVariantIndex].price.salePrice,
        },
      },
      quantity,
    );
    toggleModal();
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">{productDetail.name}</h1>

      <div className="flex flex-col items-baseline space-x-4 mb-6 ">
        {calculateDiscountPercent(
          productDetail.variants[selectedVariantIndex]?.price?.originalPrice,
          productDetail.variants[selectedVariantIndex]?.price.salePrice,
        ) > 0 ? (
          <span className=" text-primary">
            <span className="font-semibold text-3xl">
              {formatPrice(
                productDetail.variants[selectedVariantIndex]?.price.salePrice,
              )}
            </span>{" "}
            /{" "}
            <span className="text-xl">
              {productDetail.variants[selectedVariantIndex]?.unit.name}
            </span>
          </span>
        ) : (
          <span className="text-2xl text-primary">Liên hệ</span>
        )}

        {calculateDiscountPercent(
          productDetail.variants[selectedVariantIndex]?.price?.originalPrice,
          productDetail.variants[selectedVariantIndex]?.price.salePrice,
        ) > 0 && (
          <div className="flex flex-row mt-3 gap-5">
            <span className="line-through text-2xl text-gray-500">
              {formatPrice(
                productDetail.variants[selectedVariantIndex]?.price
                  ?.originalPrice,
              )}
            </span>
            <p className="rounded-sm bg-red-600 text-md text-white px-1.5 content-center">
              -
              {calculateDiscountPercent(
                productDetail.variants[selectedVariantIndex]?.price
                  ?.originalPrice,
                productDetail.variants[selectedVariantIndex]?.price.salePrice,
              )}
              %
            </p>
          </div>
        )}
        {/* Đơn vị tính */}
        <div className="flex mt-5 items-center justify-between">
          <span className="text-gray-800 text-lg">Chọn đơn vị tính</span>

          <div className="ml-5 flex flex-row gap-3">
            {productDetail.variants.map((item: any, index: number) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedVariantIndex(index);
                }}
                className={`overflow-hidden relative py-2 cursor-pointer border rounded-full px-4 ${index === selectedVariantIndex ? "border-primary text-primary" : "border-gray-600 text-gray-600"}`}
              >
                {item.packageDescription}
                {index === selectedVariantIndex && (
                  <Check className="size-4 box-content px-1 rounded-bl-2xl absolute top-0 right-0 bg-primary text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Số lượng */}
        <div className="flex mt-5 items-center justify-between">
          <span className="text-gray-800 text-lg">Chọn số lượng</span>

          <div className="join h-10 ml-5 overflow-hidden rounded-full border border-base-300">
            <button
              type="button"
              onClick={() => {
                setQuantity(quantity - 1);
              }}
              disabled={quantity <= 1}
              className={`btn btn-ghost btn-sm join-item h-full ${
                quantity <= 1 ? "cursor-not-allowed" : ""
              }`}
              // className="btn btn-ghost join-item h-full min-h-0 w-11 rounded-none px-0 disabled:bg-transparent"
            >
              −
            </button>

            <span className="flex w-11 items-center justify-center border-x border-base-300 text-base">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className="btn btn-ghost join-item h-full min-h-0 w-11 rounded-none px-0"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-baseline space-x-4 mb-6">
        {/* <button
          className="btn btn-outline hover:bg-none btn-primary rounded-full"
          onClick={handleAddToCart}
        >
          Chọn mua
        </button> */}

        <button
          onClick={() => {
            handleAddToCart();
          }}
          className="btn btn-primary rounded-full"
        >
          Chọn mua
        </button>
      </div>
      <div>
        <p>
          <span className="font-medium">Mô tả: </span>
          {productDetail.description}
        </p>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <span className="font-medium w-[60]">Xuất xứ: </span>
            <span className=""> {productDetail.country}</span>
          </div>
          <div className="flex flex-row">
            <span className="font-medium w-[100]">Thương hiệu: </span>
            <span className=""> {productDetail.brand}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductAction;
