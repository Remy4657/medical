"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchSuggest } from "@/hooks/useSearch";
import SearchSuggestionDropdown from "./SearchSuggestionDropdown";

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

  const handleSearch = () => {
    const q = keyword.trim();

    if (!q) {
      return;
    }

    setIsFocused(false);

    router.push(`/tim-kiem?q=${encodeURIComponent(q)}`);
  };

  // --------------------------------------------------
  // VIEW ALL
  // --------------------------------------------------

  const handleViewAll = () => {
    //  handleSearch(keyword);
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
            className="py-3"
            onKeyDown={handleSearch}
          />
        </label>
      </div>
      {true && (
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
          {isPending && <div className="p-4">Đang tìm kiếm...</div>}

          {!isPending && data && (
            <SearchSuggestionDropdown
              data={data}
              keyword={keyword}
              onViewAll={handleViewAll}
              onSearch={handleSearch}
              onClose={() => setIsFocused(false)}
            />
          )}
        </div>
      )}
    </div>
    // <div ref={containerRef} className="relative w-full">

    //   <form
    //     onSubmit={(event) => {
    //       event.preventDefault();
    //       handleSearch();
    //     }}
    //   >
    //     <div
    //       className="
    //         flex
    //         h-12
    //         items-center
    //         rounded-full
    //         border
    //         px-4
    //       "
    //     >
    //       <input
    //         value={keyword}
    //         onChange={(event) => setKeyword(event.target.value)}
    //         onFocus={() => setIsFocused(true)}
    //         placeholder="Tìm kiếm sản phẩm..."
    //         className="
    //           flex-1
    //           bg-transparent
    //           outline-none
    //         "
    //       />

    //       <button type="submit" className="ml-2">
    //         🔍
    //       </button>
    //     </div>
    //   </form>

    //   {/* DROPDOWN */}

    //   {shouldShowDropdown && (
    //     <div
    //       className="
    //         absolute
    //         left-0
    //         right-0
    //         top-full
    //         z-50
    //         mt-2
    //         overflow-hidden
    //         rounded-xl
    //         border
    //         bg-white
    //         shadow-lg
    //       "
    //     >
    //       {isFetching && <div className="p-4">Đang tìm kiếm...</div>}

    //       {!isFetching && data && (
    //         <SearchSuggestionDropdown
    //           data={data}
    //           keyword={keyword}
    //           onViewAll={handleViewAll}
    //           onSearch={handleSearch}
    //           onClose={() => setIsFocused(false)}
    //         />
    //       )}
    //     </div>
    //   )}
    //</div>
  );
}
