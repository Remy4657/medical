export const fetchAllCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    ).then((res) => res.json());
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
