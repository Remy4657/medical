"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

const page = () => {
  const handleCallApi = () => {
    const res = api.patch("http://localhost:5001/api/v1/cart/items/1");
    console.log("res: ", res);
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          handleCallApi();
        }}
      >
        call api
      </button>
    </div>
  );
};

export default page;
