"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count change", count);
  }, [count]);
  return (
    <div>
      page
      <button onClick={() => setCount(count + 1)}>button</button>
    </div>
  );
};

export default page;
