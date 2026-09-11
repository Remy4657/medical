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
  const { keywordSuggestions, categories, products, total } = data;

  const hasData =
    keywordSuggestions.length > 0 ||
    categories.length > 0 ||
    products.length > 0;

  if (!hasData) {
    return (
      <div className="p-5 text-sm text-gray-500">Không tìm thấy sản phẩm</div>
    );
  }

  return (
    <div className="fixed inset-0 z-10">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
        onClick={onClose}
      />
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

              <span>Danh mục {category.name}</span>
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
                    flex-shrink-0
                    overflow-hidden
                    rounded-xl

                  "
              >
                {product.image && (
                  <img
                    src={product.image}
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

                {product.price && (
                  <div className="mt-1">
                    <span
                      className="
                          font-semibold
                        "
                    >
                      {formatPrice(product.price.salePrice)}đ
                    </span>

                    {product.unit && (
                      <span className="ml-1">/ {product.unit.name}</span>
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

      {total > 0 && (
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
            py-4
            font-medium
            text-blue-600
            hover:bg-gray-50
          "
        >
          <span>Xem tất cả</span>

          <span>→</span>
        </button>
      )}
    </div>
  );
}
