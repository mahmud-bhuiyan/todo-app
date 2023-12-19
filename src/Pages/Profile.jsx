import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../Context/UserContext";
import { logoutUser } from "../services/api/User";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/users/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-md text-center">
      <Helmet>
        <title>Profile | DailyDocket</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4 uppercase">User Profile</h2>

      <div className="mb-8">
        <p className="mb-2 text-lg font-semibold">Name: {user?.name}</p>
        <p className="mb-2 text-lg font-semibold">Email: {user?.email}</p>
      </div>

      <div className="flex flex-col space-y-4">
        {/* <Link
          to="/user/update-profile"
          className="btn btn-sm btn-info text-white"
        >
          Update Profile
        </Link>
        <Link
          to="/user/update-password"
          className="btn btn-sm btn-success text-white"
        >
          Update Password
        </Link> */}
        <button className="btn btn-sm btn-info text-white">
          Update Profile
        </button>
        <button className="btn btn-sm btn-success text-white">
          Update Password
        </button>
        <button
          className="btn btn-sm btn-error text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
