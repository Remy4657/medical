import AuthInfo from "../AuthInfo";
import SearchBox from "../search/SearchBox";
import Navigation from "./Navigation";
import Logo from "./Logo";
import NavigationBar from "./NavigationBar";

const Navbar = async () => {
  return (
    <div className="navbar p-0 z-10">
      <div className="flex flex-col w-full">
        <div className="flex bg-blue-700 px-3 xl:px-0">
          <div className="flex flex-row justify-between mx-auto w-full min-h-22 max-w-7xl gap-3">
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
