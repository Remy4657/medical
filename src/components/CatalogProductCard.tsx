"use client";
import { useCartStore } from "@/stores/useCartStore";
import { useCommonStore } from "@/stores/useCommonStore";
import { Product } from "@/types";
import { calculateDiscountPercent, formatPrice } from "@/utils/formatPrice";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CatalogProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleModal } = useCommonStore();

  const primaryImage = product.images.find(
    (image: any) => Number(image.sortOrder) === 0 && image.isPrimary === true,
  )?.imageUrl;
  return (
    <article className="bg-base-0  card group h-full overflow-hidden transition border border-base-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl">
      <Link href={`/san-pham/${product.slug}`} className="relative block">
        <figure className="aspect-4/3 bg-base-300">
          {product.images ? (
            <img
              src={primaryImage}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </figure>
        <span className="badge badge-sm absolute left-3 top-3 border-0 bg-base-100/90 text-xs font-medium text-base-content/80 backdrop-blur">
          {product.country.name}
        </span>
        {calculateDiscountPercent(
          product.bestVariant?.price?.originalPrice,
          product.bestVariant?.price.salePrice,
        ) > 0 ? (
          <span className="px-3 py-1  absolute right-0 top-0 rounded-bl-2xl border-0 bg-red-600 text-xs font-medium text-white">
            -
            {calculateDiscountPercent(
              product.bestVariant?.price?.originalPrice,
              product.bestVariant?.price.salePrice,
            )}
            %
          </span>
        ) : (
          ""
        )}
      </Link>
      <div className="card-body grow gap-3 p-5 text-left">
        <Link
          href={`/san-pham/${product.slug}`}
          className="card-title line-clamp-2 text-lg transition group-hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">
          {product.description}
        </p>
        <div className="card-actions mt-auto items-start justify-start border-t border-base-200 pt-4 flex-col">
          <span className="text-md ">
            {formatPrice(product.bestVariant?.price?.salePrice)} /{" "}
            {product.bestVariant?.unit?.name}
          </span>
          {calculateDiscountPercent(
            product.bestVariant?.price?.originalPrice,
            product.bestVariant?.price.salePrice,
          ) > 0 ? (
            <span className="line-through text-md ">
              {formatPrice(product.bestVariant?.price?.originalPrice)}
            </span>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            addItem({
              variantId: product.bestVariant.id,
              productId: product.id,
              sku: product.bestVariant.sku,
              productName: product.name,
              packageDescription: product.bestVariant.packageDescription,
              image: product?.images[0]?.imageUrl ?? "",
              unit: {
                id: product.bestVariant.unit.id,
                name: product.bestVariant.unit.name,
                code: product.bestVariant.unit.code,
              },
              price: {
                originalPrice: product.bestVariant.price.originalPrice,
                salePrice: product.bestVariant.price.salePrice,
              },
            });
            toggleModal();
          }}
          className="btn btn-primary btn-sm gap-1 shadow"
        >
          <PlusIcon className="size-4" aria-hidden />
          Chọn mua
        </button>
      </div>
    </article>
  );
}
