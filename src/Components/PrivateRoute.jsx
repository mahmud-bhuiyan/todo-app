import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <h3>Loading ...</h3>
      </div>
    );
  }

  if (user?.email) {
    return children;
  }

  return (
    <Navigate state={{ from: location }} to="/users/login" replace></Navigate>
  );
};

export default PrivateRoute;
