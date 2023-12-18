import { Link } from "react-router-dom";
import { customButtonStyle } from "./CustomButtonStyle";

const AuthPrompt = ({ text, name, link }) => {
  return (
    <div className="flex items-center justify-center">
      <p className="mb-0 mr-2">{text}</p>
      <Link to={link} className={`${customButtonStyle}`}>
        {name}
      </Link>
    </div>
  );
};

export default AuthPrompt;
