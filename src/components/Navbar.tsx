import { ChevronDown, CircleUserRound, Moon, Sun } from "lucide-react";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { fetchAllCategories } from "@/services/categoryService";
import AuthInfo from "./AuthInfo";

const Navbar = async () => {
  const resListCategories = await fetchAllCategories();

  return (
    <div className="navbar z-10 border-b border-base-300 shadow-sm bg-base-100/95 backdrop-blur-md">
      <div className="flex flex-row justify-between mx-auto w-full min-h-14 max-w-7xl">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                <StoreIcon className="size-8" aria-hidden />
              </span>
              <span className="invisible xs:visible leading-none">An Sinh</span>
            </Link>
          </div>
          {/* end logo */}
        </div>
        <div className="navbar-center hidden lg:flex gap-2">
          {resListCategories.map((p: any) => (
            <div key={p.id} className="dropdown dropdown-hover">
              <div tabIndex={0} role="" className="m-1 flex gap-1">
                <Link href={`/${p.slug}`}>{p.name}</Link>
                <ChevronDown />
              </div>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {p.children.map((c: any) => (
                  <li key={c.id}>
                    <Link href={`/${p.slug}/${c.slug}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <AuthInfo />
      </div>
    </div>
  );
};

export default Navbar;
