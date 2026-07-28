import api from "../lib/api";
export const getAllCategories = async () => {
  try {
    const res = await api.get("/categories");
    console.log("res product: ", res);
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllProducts = async () => {
  try {
    const res = await api.get("/products");
    console.log("res cate: ", res);

    return res.data.data?.products;
  } catch (error) {
    console.error(error);
  }
};
