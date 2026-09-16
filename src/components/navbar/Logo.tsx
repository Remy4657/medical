import { StoreIcon } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl"
      >
        {/* <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
          <StoreIcon className="size-8 text-white" aria-hidden />
        </span> */}
        {/* Logo icon */}
        <div className="relative h-9 w-9">
          <div className="absolute left-2 top-1 h-7 w-5 rotate-[25deg] rounded-full bg-[#ed008c]" />
          <div className="absolute left-0 top-3 h-2 w-6 rounded-full bg-[#ed008c]" />
          <div className="absolute left-1 top-6 h-1.5 w-4 rounded-full bg-[#ed008c]" />
        </div>
        <span className="invisible xs:visible leading-non text-white">
          An Sinh
        </span>
      </Link>
    </div>
  );
};

export default Logo;
