"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchSuggest } from "@/hooks/useSearch";
import SearchSuggestionDropdown from "./SearchSuggestionDropdown";
import { SearchSuggestionsSkeleton } from "../skeleton/SearchSuggestsSkeleton";

export default function SearchBox() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 500);
  const { data, isPending } = useSearchSuggest(debouncedKeyword);

  // --------------------------------------------------
  // CLICK OUTSIDE
  // --------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------------------------------
  // GO TO SEARCH
  // --------------------------------------------------

  const handleSearch = (value: string) => {
    const q =
      value && typeof value === "string" ? value.trim() : keyword.trim();
    if (!q) {
      return;
    }
    setKeyword(value);
    setIsFocused(false);
    router.push(`/tim-kiem?q=${encodeURIComponent(q)}`);
  };

  const shouldShowDropdown = isFocused && keyword.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative flex items-center basis-300">
      <div className=" flex items-center basis-300">
        <label className=" input w-full py-[25] text-lg rounded-3xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onFocus={() => setIsFocused(true)}

            placeholder="Tìm kiếm sản phẩm..."
            className="py-3 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
                handleSearch(keyword);
              }
            }}
          />
        </label>
      </div>
      {shouldShowDropdown && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50

            overflow-hidden
            rounded-xl

            bg-white
            shadow-lg
          "
        >
          {isPending && <SearchSuggestionsSkeleton />}

          {!isPending && data && (
            <SearchSuggestionDropdown
              data={data}
              keyword={keyword}
              onSearch={handleSearch}
              onClose={() => setIsFocused(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
