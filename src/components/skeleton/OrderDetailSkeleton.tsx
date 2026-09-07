export default function OrderDetailSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="p-5">
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mx-auto flex h-[68px] max-w-[770px] items-center justify-center px-4">
          <div className="h-7 w-[260px] animate-pulse rounded-md bg-gray-200" />
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-[770px] px-4 pb-8 pt-4">
        {/* Order status */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          <div className="flex items-center justify-between gap-4">
            <div className="h-5 w-[180px] animate-pulse rounded bg-gray-200" />

            <div className="h-5 w-[90px] animate-pulse rounded bg-gray-200" />
          </div>
        </section>

        {/* Customer */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          <div className="mb-2 h-5 w-[230px] animate-pulse rounded bg-gray-200" />

          <div className="h-4 w-[80%] animate-pulse rounded bg-gray-200" />
        </section>

        {/* Products */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                {/* Product image */}
                <div className="h-[100px] w-[80px] shrink-0 animate-pulse rounded-md bg-gray-200" />

                {/* Product info */}
                <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-[1px]">
                  <div className="space-y-2">
                    <div className="h-4 w-[90%] animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-[60%] animate-pulse rounded bg-gray-200" />
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-4 rounded-2xl border border-gray-200 px-[14px] py-[15px]">
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Payment */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-[280px] animate-pulse rounded bg-gray-200" />
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Total */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />

              <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </section>

        {/* Home button */}
        <div className="h-[55px] w-full animate-pulse rounded-full bg-gray-200" />
      </div>
    </main>
  );
}
