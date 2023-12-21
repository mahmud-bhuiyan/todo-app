import { Link, useNavigate } from "react-router-dom";
import { demo_user } from "../../assets/images";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { logoutUser } from "../../services/api/User";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const userName = user?.name;
  const firstName = userName ? userName.split(" ")[0] : "";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.reload();
      navigate("/users/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <div className="navbar bg-green-100 py-3">
      <div className="navbar-start"></div>
      <div className="navbar-center hidden sm:flex mx-2">
        <Link to="/" className=" text-xl sm:text-2xl">
          DailyDocket
        </Link>
      </div>
      <div className="navbar-end">
        <h3 className="text-sm mr-1 capitalize">Welcome, {firstName}</h3>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost btn-circle border-2 border-slate-400 avatar"
          >
            <div className="w-6 rounded-full">
              <img src={demo_user} alt="demo_user" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/users/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
