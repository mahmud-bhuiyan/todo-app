import { Link } from "react-router-dom";
import Topbar from "./Topbar";

const Navbar = () => {
  return (
    <div className="w-full navbar bg-base-300">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>

      <Link to="/" className="flex-1 px-2 font-serif font-semibold">
        DailyDocket
      </Link>

      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className="menu dropdown-content z-[1] p-4 shadow bg-base-100 rounded w-52 mt-4"
            >
              {/* Topbar Navbar menu content here */}
              <Topbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
