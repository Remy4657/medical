import { StoreIcon } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link
        href="/"
        className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl"
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
          <StoreIcon className="size-8 text-white" aria-hidden />
        </span>
        <span className="invisible xs:visible leading-non text-white">
          An Sinh
        </span>
      </Link>
    </div>
  );
};

export default Logo;
