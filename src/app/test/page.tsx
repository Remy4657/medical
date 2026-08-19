"use client";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

const page = () => {
  const handleCallApi = () => {
    const res = api.get("http://localhost:5001/order");
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
