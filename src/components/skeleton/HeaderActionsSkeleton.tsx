export default function HeaderActionsSkeleton() {
  return (
    <div className="navbar-end text-white">
      <div className="flex flex-row items-center">
        {/* Theme */}
        <div className="flex h-10 w-10 items-center justify-center">
          <span className="h-5 w-5 animate-pulse rounded-full bg-white/20" />
        </div>

        {/* Cart */}
        <div className="relative flex h-10 w-12 items-center justify-center">
          <span className="h-6 w-6 animate-pulse rounded bg-white/20" />
        </div>

        {/* User */}
        <div className="hidden px-2 sm:block">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 animate-pulse rounded-full bg-white/20" />
            <span className="h-4 w-28 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
