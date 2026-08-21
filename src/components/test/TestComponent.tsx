import axios from "axios";
const TestComponent = async () => {
  // const response = await fetch("http://localhost:3000/api/v1/products", {
  //   cache: "no-cache",
  // }).then((res) => res.json());

  const response = await axios.patch("http://localhost:3000/api/v1/products");
  //console.log("[test] response: ", response);
  return <div>test</div>;
};

export default TestComponent;
