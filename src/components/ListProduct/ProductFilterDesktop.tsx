// import { ProductFilters } from "./ListProductsSlug";

import { useState } from "react";

type Props = {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export default function ProductFilterDesktop({ filters, setFilters }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <div className="sticky top-24">
      <h2 className="mb-5 text-lg font-semibold">Bộ lọc</h2>

      {/* Price */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input
          type="checkbox"
          checked={openId === 1}
          onChange={() => setOpenId((prev) => (prev === 1 ? null : 1))}
        />

        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>

        <div
          className={`collapse-content text-sm grid transition-[grid-template-rows] duration-300 ease-in-out ${
            openId === 1 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
      </div>
      {/* /// */}
      <div className="mb-6">
        <h3 className="mb-3 font-medium">Khoảng giá</h3>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Từ"
            className="input input-bordered w-full"
            value={filters?.minPrice ?? ""}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                minPrice: Number(e.target.value),
              }))
            }
          />

          <input
            type="number"
            placeholder="Đến"
            className="input input-bordered w-full"
            value={filters?.maxPrice ?? ""}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="mb-3 font-medium">Màu sắc</h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={filters?.colors?.includes("black")}
              onChange={() => {
                setFilters((prev: any) => ({
                  ...prev,
                  colors: prev.colors.includes("black")
                    ? prev.colors.filter((color: any) => color !== "black")
                    : [...prev.colors, "black"],
                }));
              }}
            />
            Đen
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="checkbox"
              checked={filters?.colors?.includes("white")}
              onChange={() => {
                setFilters((prev: any) => ({
                  ...prev,
                  colors: prev.colors.includes("white")
                    ? prev.colors.filter((color: any) => color !== "white")
                    : [...prev.colors, "white"],
                }));
              }}
            />
            Trắng
          </label>
        </div>
      </div>
    </div>
  );
}
