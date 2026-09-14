export function SearchSuggestionsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* KEYWORD */}
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex w-full items-center gap-3 px-5 py-3">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* CATEGORY */}
      <div className="border-t border-gray-200">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex w-full items-center gap-3 px-5 py-3">
            <div className="h-5 w-5 rounded bg-gray-200" />
            <div
              className={`h-4 rounded bg-gray-200 ${
                index === 0 ? "w-32" : "w-44"
              }`}
            />
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="border-t border-gray-200">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-4 px-4 py-3">
            {/* IMAGE */}
            <div className="h-24 w-24 shrink-0 rounded-xl bg-gray-200" />

            {/* CONTENT */}
            <div className="min-w-0 flex-1 py-1">
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="border-t border-gray-200 py-4">
        <div className="mx-auto h-5 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
