import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user?.email) {
    return children;
  }

  return (
    <Navigate state={{ from: location }} to="/users/login" replace></Navigate>
  );
};

export default PrivateRoute;
