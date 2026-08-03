// import { ProductFilters } from "./ListProductsSlug";

type Props = {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

export default function ProductFilterDesktop({ filters, setFilters }: Props) {
  return (
    <div className="sticky top-24">
      <h2 className="mb-5 text-lg font-semibold">Bộ lọc</h2>

      {/* Price */}
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
