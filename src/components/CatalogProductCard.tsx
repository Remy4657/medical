import { Product } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
//import { formatPrice } from "../utils/format.js";
//import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
//import { useCart } from "../store/cart.js";

export function CatalogProductCard({ product }: { product: Product }) {
  //const addItem = useCart((s) => s.addItem);
  return (
    <article className="bg-base-0  card group h-full overflow-hidden transition border border-transparent hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <figure className="aspect-4/3 bg-base-300">
          {product.images ? (
            <img
              src={undefined}
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
      </Link>
      <div className="card-body grow gap-3 p-5 text-left">
        <Link
          href={`/product/${product.slug}`}
          className="card-title line-clamp-2 text-lg transition group-hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">
          {product.description}
        </p>
        <div className="card-actions mt-auto items-start justify-start border-t border-base-200 pt-4 flex-col">
          <span className="text-md ">
            {formatPrice(product.variants[0]?.price?.salePrice)} /{" "}
            {product.variants[0]?.unit?.name}
          </span>
          <span className="line-through text-md ">
            {formatPrice(product.variants[0]?.price?.originalPrice)}
          </span>
        </div>
        <button
          type="button"
          //onClick={() => addItem(product.id)}
          className="btn btn-primary btn-sm gap-1 shadow"
        >
          <PlusIcon className="size-4" aria-hidden />
          Add
        </button>
      </div>
    </article>
  );
}
