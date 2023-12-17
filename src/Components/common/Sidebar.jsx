import { useState } from "react";
import { arrow, logo } from "../../assets/images";
import { Outlet } from "react-router-dom";
import { navLinks } from "./NavLinks";
import CustomLink from "../customComponents/CustomLink";
import CustomLogo from "../customComponents/CustomLogo";
import Navbar from "./Navbar";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-48" : "w-20"
        } duration-300 p-6 h-screen bg-dark-purple text-white relative`}
      >
        <img
          src={arrow}
          alt="arrow icon"
          className={`w-6 absolute cursor-pointer rounded-full -right-3 top-7 border-2 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        {/* Logo Link */}
        <CustomLogo
          to="/"
          src={logo}
          alt="logo"
          text="DailyDocket"
          open={open}
        />

        {/* nav links */}
        <ul className="pt-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              {/* Custom nav links */}
              <CustomLink
                to={link.to}
                src={link.src}
                title={link.title}
                open={open}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* outlet  */}
      <div className=" text-2xl font-semibold flex-1 h-screen">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
