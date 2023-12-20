import { Link } from "react-router-dom";
import { demo_user } from "../../assets/images";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log(user.name);
  return (
    <div className="navbar bg-green-100 py-3 mb-8">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link to="/" className=" text-xl sm:text-2xl">
          DailyDocket
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-ghost btn-circle border-2 border-slate-400 avatar"
            data-tip={user.name}
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
              <Link to="/users/profile">
                Profile
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
