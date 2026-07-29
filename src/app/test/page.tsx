import TestComponent from "@/components/test/TestComponent";
import axios from "axios";

const page = async () => {
  //   const response = await fetch("http://localhost:3000/api/v1/products", {
  //     cache: "no-cache",
  //   }).then((res) => res.json());

  const response = await axios.get("http://localhost:3000/api/v1/products");
  //  console.log("[page] response: ", response);
  return (
    <div>
      page
      <TestComponent />
    </div>
  );
};

export default page;
