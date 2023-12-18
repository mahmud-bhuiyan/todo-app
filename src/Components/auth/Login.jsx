import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { logo } from "../../assets/images";
import CustomInput from "../form/CustomInput";
import { customButtonStyle } from "../form/CustomButtonStyle";
import { toast } from "react-toastify";
import CustomFormLogo from "../form/CustomFormLogo";
import AuthPrompt from "../form/AuthPrompt";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Login Successful");
  };

  return (
    <section className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Login | DailyDocket</title>
      </Helmet>
      <div className="h-screen bg-[#B4E4FF] p-3 sm:p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p className="mb-4 text-center">
                        Please login to your account
                      </p>
                      {/* email input */}
                      <CustomInput
                        type="text"
                        name="email"
                        // label="Email"
                        placeholder="Email"
                        register={register}
                        errors={errors}
                        validation={{
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />

                      {/* Password input */}
                      <CustomInput
                        type="password"
                        name="password"
                        // label="Password"
                        placeholder="Password"
                        register={register}
                        errors={errors}
                        validation={{
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                          maxLength: {
                            value: 20,
                            message:
                              "Password can not be more than 20 characters",
                          },
                        }}
                      />

                      {/* Submit button */}
                      <div className="mb-10 text-center">
                        <input
                          type="submit"
                          value="Log in"
                          className={`w-full mt-2 ${customButtonStyle}`}
                        />
                      </div>

                      {/* Register button */}
                      <AuthPrompt
                        text="New here? Create an account"
                        name="REGISTER"
                        link="/register"
                      />
                    </form>
                  </div>
                </div>

                {/* Right column container*/}
                <div
                  className="flex items-center text-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none p-2 sm:p-16"
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
    </section>
  );
};

export default Login;
