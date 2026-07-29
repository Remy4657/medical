export const fetchProductByCategory = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/?category=${slug}`,
      { cache: "force-cache" },
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`).then(
      (res) => res.json(),
    );
    console.log("res products: ", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
