import { CircleUserRound, Moon, Sun } from "lucide-react";
import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";

const Navbar = () => {
  // const { getToken, isSignedIn } = useAuth();

  //   const { data: meData } = useQuery({
  //     queryKey: ["me"],
  //     queryFn: () => apiFetch("/api/me", { getToken }),
  //     enabled: isSignedIn,
  //   });

  //const role = meData?.user?.role;
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // sau khi login xong sẽ redirect đến dashboard
    });
  };
  return (
    // <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur-md">
    //   <div className="navbar d-flex flex-row justify-between mx-auto min-h-14 max-w-7xl px-4 py-2.5 md:px-6 md:py-3">
    //     <div>
    //       <Link
    //         href="/"
    //         className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl"
    //       >
    //         <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
    //           <StoreIcon className="size-8" aria-hidden />
    //         </span>
    //         <span className="leading-none">An Sinh</span>
    //       </Link>
    //     </div>

    //     <nav className="flex items-center gap-1 md:gap-1.5">
    //       <div>
    //         <Link href="/a" className="btn btn-ghost gap-2 font-medium">
    //           <span className="hidden sm:inline">Sản phẩm</span>
    //         </Link>
    //         <div className="dropdown dropdown-hover">
    //           <div
    //             tabIndex={0}
    //             role="button"
    //             className="btn btn-ghost gap-2 font-medium"
    //           >
    //             Thuốc
    //           </div>
    //           <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    //             <li>
    //               <Link href="/b">Thuốc kháng sinh</Link>
    //             </li>
    //             <li>
    //               <Link href="/#">Thuốc đau đầu</Link>
    //             </li>
    //           </ul>
    //         </div>
    //         <Link href="/blog" className="btn btn-ghost gap-2 font-medium">
    //           <span className="hidden sm:inline">Bài viết</span>
    //         </Link>
    //       </div>
    //     </nav>

    //     <div className="flex flex-row items-center">
    //       <div className="flex flex-row items-center gap-1">
    //         <Sun className="size-4" />
    //         <input
    //           type="checkbox"
    //           className="toggle toggle-sm"
    //           value="dark"
    //           data-set-theme
    //         />
    //         <Moon className="size-4" />
    //       </div>
    //       <Link
    //         href="/cart"
    //         className="btn btn-ghost gap-2 font-medium indicator"
    //         aria-label={"Cart"}
    //       >
    //         <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
    //       </Link>
    //       <button
    //         className="btn btn-ghost"
    //         onClick={() =>
    //           (
    //             document.getElementById("my_modal_2") as HTMLDialogElement
    //           ).showModal()
    //         }
    //       >
    //         <CircleUserRound />
    //         Đăng nhập
    //       </button>
    //       <dialog id="my_modal_2" className="modal">
    //         <div className="modal-box flex flex-col">
    //           <h3 className="font-bold text-lg mb-5">Xin chào!</h3>
    //           <button className="btn m-auto" onClick={signInWithGoogle}>
    //             Tiếp tục với google
    //           </button>
    //         </div>
    //         <form method="dialog" className="modal-backdrop">
    //           <button>close</button>
    //         </form>
    //       </dialog>
    //     </div>
    //   </div>
    // </header>

    <div className="navbar sticky top-0 z-50 border-b border-base-300 shadow-sm bg-base-100/95 backdrop-blur-md">
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
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div>
            <Link
              href="/"
              className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 p-1 text-primary">
                <StoreIcon className="size-8" aria-hidden />
              </span>
              <span className="leading-none">An Sinh</span>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details className="dropdown dropdown-hove">
                <summary>Thuốc</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li>
                    <Link href="/b">Thuốc kháng sinh</Link>
                  </li>
                  <li>
                    <Link href="/b">Thuốc đau đầu</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="dropdown dropdown-hove">
                <summary>Thực phẩm chức năng</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                  <li>
                    <Link href="/b">Sữa tiệt trùng</Link>
                  </li>
                  <li>
                    <Link href="/b">Vitamin C</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Bài viết</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center gap-1">
              <Sun className="size-4" />
              <input
                type="checkbox"
                className="toggle toggle-sm"
                value="dark"
                data-set-theme
              />
              <Moon className="size-4" />
            </div>
            <Link
              href="/cart"
              className="btn btn-ghost gap-2 font-medium indicator"
              aria-label={"Cart"}
            >
              <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
            </Link>
            <button
              className="btn btn-ghost"
              onClick={() =>
                (
                  document.getElementById("my_modal_2") as HTMLDialogElement
                ).showModal()
              }
            >
              <CircleUserRound />
              Đăng nhập
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box flex flex-col">
                <h3 className="font-bold text-lg mb-5">Xin chào!</h3>
                <button className="btn m-auto" onClick={signInWithGoogle}>
                  Tiếp tục với google
                </button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
