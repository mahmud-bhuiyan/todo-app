import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Loader from "./Loader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
};

export default PublicRoute;
