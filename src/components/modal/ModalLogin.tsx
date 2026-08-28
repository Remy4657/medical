"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const ModalLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl, // sau khi login xong sẽ redirect đến dashboard
    });
  };
  return (
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
  );
};

export default ModalLogin;
