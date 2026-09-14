"use client";

import { formatPrice } from "@/utils/formatPrice";
import { ArrowUpLeft, Search } from "lucide-react";
import Link from "next/link";

// import type { SearchSuggestResponse } from "@/services/search-api";

// interface Props {
//   data: SearchSuggestResponse;
//   keyword: string;
//   onSearch: (value: string) => void;
//   onViewAll: () => void;
//   onClose: () => void;
// }

export default function SearchSuggestionDropdown({
  data,
  keyword,
  onSearch,
  onClose,
}: any) {
  const { keywordSuggestions, categories, products } = data;

  const hasData =
    keywordSuggestions.length > 0 ||
    categories.length > 0 ||
    products.length > 0;

  if (!hasData) {
    return (
      <div>
        <div className="p-5 text-sm text-gray-500">
          Không tìm thấy sản phẩm với từ khóa
          <span className="font-bold"> "{keyword}"</span>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* <div
        className="absolute bg-black/45 backdrop-blur-[1px]"
        onClick={onClose}
      /> */}
      {/* ----------------------------------------- */}
      {/* KEYWORD */}
      {/* ----------------------------------------- */}

      {keywordSuggestions.length > 0 && (
        <div>
          {keywordSuggestions.map((item: any) => (
            <button
              key={item}
              type="button"
              onClick={() => onSearch(item)}
              className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-left
                  hover:bg-gray-50
                "
            >
              <span className="text-gray-400">
                <Search />
              </span>

              <span>{item}</span>
            </button>
          ))}
        </div>
      )}

      {/* ----------------------------------------- */}
      {/* CATEGORY */}
      {/* ----------------------------------------- */}

      {categories.length > 0 && (
        <div
          className="
            border-t
            border-gray-200

          "
        >
          {categories.map((category: any) => (
            <Link
              key={category.id}
              href={`/danh-muc/${category.slug}`}
              onClick={onClose}
              className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  hover:bg-gray-50
                "
            >
              <span className="text-gray-400">
                <ArrowUpLeft />
              </span>

              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* ----------------------------------------- */}
      {/* PRODUCTS */}
      {/* ----------------------------------------- */}

      {products.length > 0 && (
        <div
          className="
            border-t
            border-gray-200

          "
        >
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/san-pham/${product.slug}`}
              onClick={onClose}
              className="
                  flex
                  gap-4
                  px-4
                  py-3
                  hover:bg-gray-50
                "
            >
              {/* IMAGE */}

              <div
                className="
                    h-24
                    w-24
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                  "
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="
                        h-full
                        w-full
                        object-contain
                      "
                  />
                )}
              </div>

              {/* CONTENT */}

              <div className="min-w-0">
                <div
                  className="
                      line-clamp-2
                      text-sm
                    "
                >
                  {product.name}
                </div>

                {product.bestVariant.salePrice && (
                  <div className="mt-1">
                    <span
                      className="
                          font-semibold
                        "
                    >
                      {formatPrice(product.bestVariant.salePrice)}
                    </span>

                    {product.bestVariant.unitName && (
                      <span className="ml-1">
                        / {product.bestVariant.unitName}
                      </span>
                    )}
                    {product.bestVariant.originalPrice && (
                      <span
                        className="
                          font-semibold line-through ml-3 text-gray-500
                        "
                      >
                        {formatPrice(product.bestVariant.originalPrice)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ----------------------------------------- */}
      {/* VIEW ALL */}
      {/* ----------------------------------------- */}

      <button
        type="button"
        onClick={onSearch}
        className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            border-t
            border-gray-200
            py-4
            font-medium
            text-primary
            hover:bg-gray-50
          "
      >
        <span>Xem tất cả</span>
      </button>
    </div>
  );
}
