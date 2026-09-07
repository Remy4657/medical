export const OrderSkeleton = () => {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="h-[18px] w-[18px] rounded bg-gray-300" />
          </div>

          <div className="h-5 w-5 rounded bg-gray-300" />
        </div>

        {/* Order info */}
        <div className="px-4">
          <div className="flex items-center justify-between py-4">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>

          {/* Products */}
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3"
              >
                {/* Image */}
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />

                {/* Product info */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                {/* Quantity */}
                <div className="h-4 w-8 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between py-3">
            <div className="h-4 w-52 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="h-[18px] w-[18px] rounded bg-gray-300" />
          </div>

          <div className="h-5 w-5 rounded bg-gray-300" />
        </div>

        {/* Order info */}
        <div className="px-4">
          <div className="flex items-center justify-between py-4">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>

          {/* Products */}
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3"
              >
                {/* Image */}
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />

                {/* Product info */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                {/* Quantity */}
                <div className="h-4 w-8 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between py-3">
            <div className="h-4 w-52 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white animate-pulse">
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 rounded bg-gray-300" />
            <div className="h-[18px] w-[18px] rounded bg-gray-300" />
          </div>

          <div className="h-5 w-5 rounded bg-gray-300" />
        </div>

        {/* Order info */}
        <div className="px-4">
          <div className="flex items-center justify-between py-4">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>

          {/* Products */}
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3"
              >
                {/* Image */}
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />

                {/* Product info */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>

                {/* Quantity */}
                <div className="h-4 w-8 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between py-3">
            <div className="h-4 w-52 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
};
