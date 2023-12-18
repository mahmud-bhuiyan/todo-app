import { Outlet } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import Navbar from "../Components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-[#B4E4FF] flex">
      {/* Sidebar */}
      <Sidebar />

      <div className=" text-2xl font-semibold flex-1 h-screen">
        {/* Navbar */}
        <Navbar />

        {/* outlet  */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
