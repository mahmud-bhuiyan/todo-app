import { Outlet } from "react-router-dom";
import Navbar from "../Components/common/Navbar";
import Sidebar from "../Components/common/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <Navbar />
          {/* Page content here */}
          <div className="p-2 sm:p-5">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu py-4 px-2 w-36 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <Sidebar />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
