import { useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import Navbar from "../Components/common/Navbar";
import { UserContext } from "../Context/UserContext";
import { getUserProfile } from "../services/api/User";

const MainLayout = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUserProfile();
      setUser(currentUser.user);
    };
    fetchData();
  }, [setUser]);

  const location = useLocation();
  const noNavigation =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div className="max-w-screen-2xl mx-auto bg-[#B4E4FF] flex">
      {noNavigation ? null : (
        <>
          {/* Sidebar */}
          <Sidebar />

          <div className="text-2xl font-semibold flex-1 h-screen">
            {/* Navbar */}
            <Navbar />

            {/* outlet */}
            <Outlet />
          </div>
        </>
      )}
      {noNavigation && <Outlet />}
    </div>
  );
};

export default MainLayout;
