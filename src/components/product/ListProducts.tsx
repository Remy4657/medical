"use client";
import { CatalogProductCard } from "@/components/CatalogProductCard";
import { Product } from "@/types";

export default function ListProducts({
  listProducts,
}: {
  listProducts: Product[];
}) {
  console.log("listProducts: ", listProducts);
  return (
    <div className="space-y-12">
      <section id="catolag" className="scroll-mt-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-base-content md:text-2xl uppercase font-mono">
              Catalog
            </h2>
          </div>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {listProducts.map((p) => (
            <li key={p.id}>
              <CatalogProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
