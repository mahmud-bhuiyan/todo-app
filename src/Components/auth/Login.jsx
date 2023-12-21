import { Helmet } from "react-helmet-async";
import CustomFormLogo from "../form/CustomFormLogo";
import { logo } from "../../assets/images";
import CustomForm from "../form/CustomForm";
import { toast } from "react-toastify";
import { LoginFormFields } from "./LoginFormFields";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api/User";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await loginUser(userData);
      if (response && response.user && response.user._id !== "") {
        // toast.success(response.message);
        setUser(response.user);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Login | DailyDocket</title>
      </Helmet>
      <div className="h-screen bg-[#B4E4FF] p-3 sm:py-6 sm:px-20 md:px-52">
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="p-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-6">
                    {/* Logo */}
                    <CustomFormLogo
                      logoSrc={logo}
                      text="We are DailyDocket TeamThe "
                    />
                    {/* Render CustomForm component */}
                    <CustomForm
                      formTitle="Please login to your account"
                      onSubmit={onSubmit}
                      formFields={LoginFormFields}
                      formButton="login"
                      bottomText="New here? Create an account"
                      bottomTitle="REGISTER"
                      bottomLink="/users/register"
                    />
                  </div>
                </div>

                {/* Right column container*/}
                <div
                  className="flex items-center text-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none p-2 sm:p-6"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
