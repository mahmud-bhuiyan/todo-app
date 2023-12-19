import { useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import Navbar from "../Components/common/Navbar";
import { UserContext } from "../Context/UserContext";
import { getUserProfile } from "../services/api/User";

const MainLayout = () => {
  const { setUser, setLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await getUserProfile();
        setUser(currentUser.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUser, setLoading]);

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
