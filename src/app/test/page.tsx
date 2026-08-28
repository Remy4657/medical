"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import { is } from "zod/v4/locales";

const Modal = ({ setIsShowModal }: { setIsShowModal: any }) => {
  const expiredAt = Math.floor(Date.now() / 1000) + 10;
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);

      const value = Math.max(0, expiredAt - now);
      console.log("value: ", value);
      if (value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    console.log("clearInterval1");
    return () => {
      console.log("clearInterval2");
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      MODAL
      <button
        onClick={() => {
          setIsShowModal(false);
        }}
      >
        Close
      </button>
    </div>
  );
};

const page = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          setIsShowModal(true);
        }}
      >
        call api
      </button>
      {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
    </div>
  );
};

export default page;
