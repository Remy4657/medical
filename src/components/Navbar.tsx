import { ChevronDown, CircleUserRound, Moon, Sun } from "lucide-react";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { fetchAllCategories } from "@/services/categoryService";
import AuthInfo from "./AuthInfo";
import { notFound } from "next/navigation";

const Navbar = async () => {
  const resListCategories = await fetchAllCategories();

  return (
    <div className="navbar z-10">
      <div className="flex flex-col w-full">
        <div className="flex bg-blue-700 ">
          <div className="flex flex-row justify-between mx-auto w-full min-h-22 max-w-7xl">
            <div className="navbar-start text-white">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost sm:hidden text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <div className="dropdown dropdown-hover">
                      <div tabIndex={0} role="" className="m-1">
                        Hover
                      </div>
                      <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <a>Item 1</a>
                        </li>
                        <li>
                          <a>Item 2</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul>
              </div>
              {/* start logo */}
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
              {/* end logo */}
            </div>

            <div className="flex items-center basis-300">
              <label className="input w-full py-[25] text-lg rounded-3xl">
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
                  placeholder="Search"
                  className="py-3"
                />
              </label>
            </div>

            <AuthInfo />
          </div>
        </div>
        <div className="flex bg-base-0">
          <div className="min-h-16 navbar-center hidden sm:flex gap-5 mx-auto">
            {resListCategories?.map((p: any) => (
              <div key={p.id} className="dropdown dropdown-hover">
                <Link
                  href={`/danh-muc/${p.slug}`}
                  className="flex flex-row items-center"
                >
                  {" "}
                  <div tabIndex={0} role="" className="m-1 flex gap-1">
                    {p.name}{" "}
                  </div>
                  <ChevronDown />
                </Link>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {p.children.map((c: any) => (
                    <li key={c.id}>
                      <Link href={`/danh-muc/${p.slug}/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
