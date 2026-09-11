import { fetchAllCategories } from "@/services/categoryService";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Navigation = async () => {
  const resListCategories = await fetchAllCategories();

  return (
    <div className="flex bg-base-0">
      <div className="min-h-14 navbar-center hidden sm:flex gap-7 mx-auto">
        {resListCategories?.map((p: any) => (
          <div
            key={p.id}
            className="relative group h-full hover:border-primary hover:border-b-2"
          >
            <Link
              href={`/danh-muc/${p.slug}`}
              className="flex flex-row items-center h-full gap-1"
            >
              {" "}
              <div tabIndex={0} role="" className="">
                {p.name}{" "}
              </div>
              <ChevronDown
                size={18}
                className="transition-transform duration-400 group-hover:rotate-180"
              />
            </Link>
            <div
              className="absolute left-0 top-13
                            invisible opacity-0
                            group-hover:visible group-hover:opacity-100
                            transition-opacity duration-600
                            menu bg-transparent rounded-sm
                            z-100 w-52 p-2 shadow-sm"
            >
              <ul className="bg-base-0 p-2">
                {p.children.map((c: any) => (
                  <li key={c.id}>
                    <Link href={`/danh-muc/${p.slug}/${c.slug}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
