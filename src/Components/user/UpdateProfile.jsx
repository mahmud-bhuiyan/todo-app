import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
import { updateUserProfile } from "../../services/api/User";

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const initialFormValues = React.useRef({ name: "", email: "" });

  React.useEffect(() => {
    if (user) {
      setValue("name", user?.name || user?.displayName);
      setValue("email", user.email);

      initialFormValues.current = {
        name: user?.name,
        email: user.email,
      };
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Get the current form values using getValues
      const formData = getValues();

      // Check if there are any changes in the form values
      if (
        JSON.stringify(formData) === JSON.stringify(initialFormValues.current)
      ) {
        toast.info("Nothing to update");
        return;
      }

      const response = await updateUserProfile(data);

      if (response && response.user && response.user._id !== "") {
        toast.success(response.message);
        setUser(response.user);
        navigate("/users/profile");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md text-sm">
      <Helmet>
        <title>Update Profile | DailyDocket</title>
      </Helmet>
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-600">Name:</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <input
            type="submit"
            value="Update"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
          />
          <Link
            to="/users/profile"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
