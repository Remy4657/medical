import { fetchAllCategories } from "@/services/categoryService";

import MobileSidebar from "./MobileSidebar";

const NavigationBar = async () => {
  const resListCategories = await fetchAllCategories();

  return <MobileSidebar listCategories={resListCategories} />;
};

export default NavigationBar;
