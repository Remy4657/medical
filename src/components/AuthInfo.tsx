"use client";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import { authClient, signOut } from "../lib/auth-client";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const { items, signOut: signOutStore } = useCartStore();
  const [userName, setUserName] = useState<string | null>("");

  useEffect(() => {
    console.log("session authinfo: ", session);
    setUserName(session?.user.name ?? null);
  }, [session?.user.name]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // sau khi login xong sẽ redirect đến dashboard
    });
  };
  const handleLogout = async () => {
    await authClient.signOut();
    signOutStore();
  };
  return (
    <div className="navbar-end text-white">
      <div className="flex flex-row items-center">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="dark"
            data-set-theme
          />

          <svg
            className="swap-on h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-off h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <Link
          href="/gio-hang"
          className="relative btn btn-ghost gap-2 font-medium indicator text-white"
          aria-label={"Cart"}
        >
          <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
          {items?.length > 0 && (
            <span className="absolute right-0 top-0 px-2 rounded-full bg-primary">
              {items.length}
            </span>
          )}
        </Link>
        <div className="hidden sm:block px-2">
          {userName ? (
            <div className="dropdown dropdown-hover">
              <span className="flex cursor-pointer">
                <CircleUserRound />
                Xin chào, {userName}
              </span>
              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-0 rounded-box z-1 w-52 p-2 shadow-sm text-base-content"
              >
                <li>
                  <button
                    className="btn-ghost"
                    onClick={async () => {
                      await handleLogout();
                    }}
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-ghost text-white"
              onClick={() =>
                (
                  document.getElementById("modal_login") as HTMLDialogElement
                ).showModal()
              }
            >
              <CircleUserRound />
              Đăng nhập
            </button>
          )}
        </div>
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
        <dialog id="modal_login" className="modal text-base-content p-5">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <h2 className="text-center font-bold text-2xl">Đăng nhập</h2>
              <p className="text-center">
                {" "}
                Vui lòng đăng nhập để hưởng những đặc quyền dành cho thành viên
              </p>
            </div>
            <div className="flex mt-5">
              <button
                className="btn bg-white text-black border-[#e5e5e5] m-auto"
                onClick={signInWithGoogle}
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Đăng nhập với Google
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AuthInfo;
