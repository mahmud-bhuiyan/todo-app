import { Link, useLocation } from "react-router-dom";

const CustomLink = ({ to, src, title, open }) => {
  const route = useLocation();

  return (
    <Link
      to={to}
      className={`flex gap-x-4 my-3 items-center cursor-pointer text-gray-300 hover:bg-light-white rounded text-sm ${
        !open && "tooltip tooltip-right"
      } ${to === route.pathname ? "bg-light-white" : ""}`}
      data-tip={title}
    >
      <img src={src} alt={title} className="w-6 pl-1" />
      <span className={`origin-left duration-300 ${!open && "scale-0"} my-2`}>
        {title}
      </span>
    </Link>
  );
};

export default CustomLink;
