import { ChevronDown, CircleUserRound, Moon, Sun } from "lucide-react";
import { ShoppingCartIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { fetchAllCategories } from "@/services/categoryService";
import AuthInfo from "../AuthInfo";
import { notFound } from "next/navigation";
import SearchBox from "../search/SearchBox";
import Navigation from "./Navigation";
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";

const Navbar = async () => {
  return (
    <div className="navbar p-0 z-10">
      <div className="flex flex-col w-full">
        <div className="flex bg-blue-700 ">
          <div className="flex flex-row justify-between mx-auto w-full min-h-22 max-w-7xl">
            <div className="navbar-start text-white">
              <NavigationBar />
              <Logo />
            </div>

            <SearchBox />

            <AuthInfo />
          </div>
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Navbar;
