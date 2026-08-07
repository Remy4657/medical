"use client";
import { CircleUserRound, Moon, Sun } from "lucide-react";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";

const AuthInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // sau khi login xong sẽ redirect đến dashboard
    });
  };
  return (
    <div className="navbar-end ">
      <div className="flex flex-row items-center">
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            value="dark"
            className="theme-controller"
            // value="dark"
            data-set-theme
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>

        <Link
          href="/cart"
          className="btn btn-ghost gap-2 font-medium indicator"
          aria-label={"Cart"}
        >
          <ShoppingCartIcon className="size-6 opacity-90" aria-hidden />
        </Link>
        <div className="hidden sm:block">
          {session?.user ? (
            <span className="flex">
              <CircleUserRound />
              Xin chào, {session.user.name}
            </span>
          ) : (
            <button
              className="btn btn-ghost "
              onClick={() =>
                (
                  document.getElementById("my_modal_2") as HTMLDialogElement
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
      </div>
    </div>
  );
};

export default AuthInfo;
