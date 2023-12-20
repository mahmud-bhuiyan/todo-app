import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserPassword } from "../../services/api/User";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const UpdatePassword = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const response = await updateUserPassword(passwordData);
      console.log(response);
      if (response && response.message !== "") {
        toast.success(response.message);
        setUser(response.user);
        navigate("/users/profile");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Helmet>
        <title>Update Password | DailyDocket</title>
      </Helmet>
      <h2 className="text-xl font-semibold mb-4">Update Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm">
            Current Password:
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-sm"
            {...register("currentPassword", {
              required: "Current Password is required",
            })}
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm">New Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-sm"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm">
            Confirm New Password:
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-sm"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* button  */}
        <div className="mt-4 flex justify-between">
          <input
            type="submit"
            value="Update Password"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800 text-sm"
          />
          <Link
            to="/users/profile"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-sm"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
