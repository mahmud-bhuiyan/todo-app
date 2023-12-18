import { Link } from "react-router-dom";

const CustomSidebarLogo = ({ to, src, alt, text, open }) => {
  return (
    <Link to={to} className="flex gap-x-2 items-center cursor-pointer">
      <img
        src={src}
        alt={alt}
        className={`w-6 duration-300 cursor-pointer ${
          open && "rotate-[360deg]"
        }`}
      />
      <h1
        className={`origin-left font-medium text-xl duration-300 ${
          !open && "scale-0"
        }`}
      >
        {text}
      </h1>
    </Link>
  );
};

export default CustomSidebarLogo;
