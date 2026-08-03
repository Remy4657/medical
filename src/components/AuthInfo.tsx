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
        {session?.user ? (
          <span className="flex">
            <CircleUserRound />
            Xin chào, {session.user.name}
          </span>
        ) : (
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
        )}

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
