export default function HeaderActionsSkeleton() {
  return (
    <div className="flex flex-row items-center">
      {/* Cart */}
      <div className="relative flex items-center gap-2 px-4 py-2">
        {/* Shopping cart icon */}
        <div className="skeleton size-6 rounded-md" />

        {/* Cart badge */}
        <div className="skeleton absolute right-0 top-0 h-5 w-5 rounded-full" />
      </div>

      {/* User */}
      <div className="hidden px-2 sm:block">
        <div className="flex items-center gap-2">
          {/* User icon */}
          <div className="skeleton size-6 rounded-full" />

          {/* Username */}
          <div className="skeleton h-5 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
