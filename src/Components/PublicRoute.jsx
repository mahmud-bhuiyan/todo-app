import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <h3>Loading ...</h3>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }

  return children;
};

export default PublicRoute;
