// import { ProductFilters } from "./ListProductsSlug";

import { useState } from "react";
import FilterAccordion from "./FilterAccordion";

type Props = {
  listBrandFilter: any;
  listCountryFilter: any;
  setBrandFilter: any;
  setCountryFilter: any;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: any;
  setMaxPrice: any;
};

export default function ProductFilterDesktop({
  listBrandFilter,
  listCountryFilter,
  setBrandFilter,
  setCountryFilter,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: Props) {
  const [openId1, setOpenId1] = useState<number | null>(1);
  const [openId2, setOpenId2] = useState<number | null>(2);
  const [openId3, setOpenId3] = useState<number | null>(3);

  const handleChangeBrand = (value: string) => {
    setBrandFilter((prev: string[]) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };
  const handleChangeCountry = (value: string) => {
    setCountryFilter((prev: string[]) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };
  const handlePriceChange = ({ min, max }: { min?: number; max?: number }) => {
    // Nếu đang chọn đúng khoảng này -> bỏ filter
    if (minPrice === min && maxPrice === max) {
      setMinPrice(undefined);
      setMaxPrice(undefined);
      return;
    }
    setMinPrice(min);
    setMaxPrice(max);
  };
  return (
    <div className="scrollbar-thin sticky top-2 bg-base-0 rounded-lg max-h-[100vh] overflow-y-auto">
      <h2 className="mb-5 text-lg font-semibold border-base-300 text-center border-b-1">
        Bộ lọc
      </h2>

      <div className="space-y-2 rounded-lg">
        <FilterAccordion
          id={1}
          title="Giá bán"
          openId={openId1}
          setOpenId={setOpenId1}
        >
          <div className="space-y-2">
            <div
              className={`cursor-pointer border-1 p-3 rounded-lg hover:border-primary hover:text-primary ${
                maxPrice === 100000
                  ? "border-primary text-primary"
                  : "border-base-200"
              }`}
              onClick={() => handlePriceChange({ max: 100000 })}
            >
              Dưới 100.000đ
            </div>
            <div
              className={`cursor-pointer border-1 p-3 rounded-lg hover:border-primary hover:text-primary ${
                minPrice === 100000 && maxPrice === 300000
                  ? "border-primary text-primary"
                  : "border-base-200"
              }`}
              onClick={() => handlePriceChange({ min: 100000, max: 300000 })}
            >
              100.000đ - 300.000đ
            </div>
            <div
              className={`cursor-pointer border-1 p-3 rounded-lg hover:border-primary hover:text-primary ${
                minPrice === 300000
                  ? "border-primary text-primary"
                  : "border-base-200"
              }`}
              onClick={() => handlePriceChange({ min: 300000, max: 500000 })}
            >
              300.000đ - 500.000đ
            </div>
            <div
              className={`cursor-pointer border-1 p-3 rounded-lg hover:border-primary hover:text-primary ${
                minPrice === 500000
                  ? "border-primary text-primary"
                  : "border-base-200"
              }`}
              onClick={() => handlePriceChange({ min: 500000 })}
            >
              Trên 500.000đ
            </div>
          </div>
        </FilterAccordion>
        <FilterAccordion
          id={2}
          title="Thương hiệu"
          openId={openId2}
          setOpenId={setOpenId2}
        >
          <div className="space-y-2 flex flex-col gap-2">
            {listBrandFilter.map((b: any) => (
              <div key={b.id} className="flex flex-row items-center gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg"
                  onClick={() => handleChangeBrand(b.slug)}
                />
                <span className="">{b.name}</span>
              </div>
            ))}
          </div>
        </FilterAccordion>

        <FilterAccordion
          id={3}
          title="Nước sản xuất"
          openId={openId3}
          setOpenId={setOpenId3}
        >
          <div className="space-y-2 flex flex-col gap-2">
            {listCountryFilter.map((c: any) => (
              <div key={c.id} className="flex flex-row items-center gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg"
                  onClick={() => handleChangeCountry(c.code)}
                />
                <span className="">{c.name}</span>
              </div>
            ))}
          </div>
        </FilterAccordion>
      </div>
    </div>
  );
}
