"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const ModalLogin = () => {
  const [otp, setOtp] = useState("");
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // sau khi login xong sẽ redirect đến dashboard
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const signInWithPhone = async () => {
    setIsOtpStep(true);
    const result = await authClient.phoneNumber.sendOtp({
      phoneNumber: "+84378404595",
    });
    console.log("result: ", result);
    if (result.error) {
      console.log(result.error);
      return;
    }
  };
  const confirmOtp = async () => {
    console.log("otp: ", otp);
    const result = await authClient.phoneNumber.verify({
      phoneNumber: "+84378404595",
      code: otp,
      updatePhoneNumber: false,
    });
    console.log("result: ", result);
    if (result.error) {
      console.log(result.error);
      return;
    }
  };
  const handleCloseModal = () => {
    setIsOtpStep(false);
  };
  return (
    <dialog id="modal_login" className="modal bg-black/40 backdrop-blur-[2px]">
      <div
        className=" modal-box
      relative
      w-[calc(100%-32px)]
      max-w-[440px]
      rounded-[12px]
      bg-white
      px-7
      pb-8
      pt-7
      text-base-content
      shadow-2xl"
      >
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
        </form>
        {true ? (
          <div className="pt-3">
            {/* Heading */}{" "}
            <div className="mt-5 text-center">
              {" "}
              <h2 className="text-[24px] font-bold tracking-[-0.3px] text-[#171717]">
                {" "}
                Đăng nhập{" "}
              </h2>{" "}
              <p className="mx-auto mt-2 max-w-[330px] text-[13px] leading-5 text-[#777]">
                {" "}
                Đăng nhập để nhận ưu đãi và trải nghiệm đầy đủ các tính năng
                dành cho thành viên.{" "}
              </p>{" "}
            </div>{" "}
            {/* Divider */}{" "}
            <div className="my-6 flex items-center gap-3">
              {" "}
              <div className="h-px flex-1 bg-[#eeeeee]" />{" "}
              <span className="text-[12px] text-[#a1a1a1]">
                {" "}
                Đăng nhập bằng{" "}
              </span>{" "}
              <div className="h-px flex-1 bg-[#eeeeee]" />{" "}
            </div>{" "}
            {/* Google */}{" "}
            <button
              disabled={isLoading}
              type="button"
              onClick={signInWithGoogle}
              className=" flex h-[48px] w-full items-center justify-center gap-3 rounded-[6px] border border-[#dedede] bg-white px-4 text-[14px] font-medium text-[#222] transition hover:border-[#cfcfcf] hover:bg-[#fafafa] active:scale-[0.99] disabled:cursor-not-allowed
    disabled:opacity-60"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  {" "}
                  <svg
                    aria-label="Google logo"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="shrink-0"
                  >
                    {" "}
                    <g>
                      {" "}
                      <path d="m0 0H512V512H0" fill="#fff" />{" "}
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      />{" "}
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      />{" "}
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      />{" "}
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      />{" "}
                    </g>{" "}
                  </svg>{" "}
                  <span>Đăng nhập với Google</span>{" "}
                </>
              )}
            </button>{" "}
            {/* Footer */}{" "}
            <p className="mt-5 text-center text-[11px] leading-5 text-[#999]">
              {" "}
              Bằng việc đăng nhập, bạn đồng ý với các điều khoản sử dụng và
              chính sách bảo mật của chúng tôi.{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="flex flex-col">
            {/* <input
              className="input input-lg w-full"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            /> */}
            <div className="flex flex-row">
              <label className="otp m-auto">
                <span className="outline-none"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <input
                  type="text"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}

                  required
                  className=""
                />
              </label>
            </div>

            <button
              className="mt-5 btn btn-primary"
              onClick={() => {
                confirmOtp();
              }}
            >
              Xác nhận
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default ModalLogin;
