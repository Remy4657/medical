"use client";
import api from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { is } from "zod/v4/locales";
// @ts-ignore
import jwt from "jsonwebtoken";

const API_KEY_SID = "SK.0.enZpvL6ZlBqk8x0DtTJ6PgrFTVzHwMRf";
const API_KEY_SECRET = "ZzlIdTBNazhOeHJVU3gycm45OUNCOUtCM1FINmNheXc=";

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
  // const [isShowModal, setIsShowModal] = useState(false);
  const createStringeeToken = async () => {
    return await jwt.sign(
      {
        jti: `${API_KEY_SID}-${Date.now()}`,
        iss: API_KEY_SID,
        exp: Math.floor(Date.now() / 1000) + 3600,
        rest_api: true,
      },
      API_KEY_SECRET,
      {
        algorithm: "HS256",
        header: {
          typ: "JWT",
          alg: "HS256",
          cty: "stringee-api;v=1",
        },
      },
    );
  };
  const handleSendOtp = async () => {
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: "84378404595",
      }),
    });

    const data = await response.json();

    console.log("data: ", data);
  };
  return (
    // <div>
    //   <button
    //     className="btn"
    //     onClick={() => {
    //       setIsShowModal(true);
    //     }}
    //   >
    //     call api
    //   </button>
    //   {isShowModal && <Modal setIsShowModal={setIsShowModal} />}
    // </div>
    <div>
      <button onClick={handleSendOtp}> Send Otp</button>
    </div>
  );
};

export default page;
