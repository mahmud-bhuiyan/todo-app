import { Helmet } from "react-helmet-async";
import CustomFormLogo from "../form/CustomFormLogo";
import { logo } from "../../assets/images";
import CustomForm from "../form/CustomForm";
import { toast } from "react-toastify";
import { RegisterFormFields } from "./RegisterFormFields";
import { registerUser } from "../../services/api/User";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Password does not match!");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await registerUser(userData);
      if (response && response.user && response.user._id !== "") {
        // toast.success(response.message);
        setUser(response.user);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Login | DailyDocket</title>
      </Helmet>
      <div className="h-screen bg-[#B4E4FF] sm:px-52">
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div
                  className="flex items-center text-center lg:rounded-l-lg rounded-t-lg lg:rounded-tr-none lg:w-6/12 p-2 sm:p-6"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Welcome to DailyDocket!
                    </h4>
                    <p className="text-sm">
                      Organize your day and boost your productivity with
                      DailyDocket. Easily manage your tasks, set priorities, and
                      stay on top of your to-do list.
                    </p>
                  </div>
                </div>

                {/* Right column container*/}
                <div className="p-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-6">
                    {/* Logo */}
                    <CustomFormLogo
                      logoSrc={logo}
                      text="We are DailyDocket TeamThe "
                    />
                    {/* Render CustomForm component */}
                    <CustomForm
                      formTitle="New here? Create an account"
                      onSubmit={onSubmit}
                      formFields={RegisterFormFields}
                      formButton="register"
                      bottomText="Already have an account? Please"
                      bottomTitle="login"
                      bottomLink="/users/login"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
