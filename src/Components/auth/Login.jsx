import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import CustomInput from "../form/CustomInput";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Login | DailyDocket</title>
      </Helmet>
      <div className="h-full bg-[#B4E4FF] p-3 sm:p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="p-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img className="mx-auto w-16" src={logo} alt="logo" />
                      <h4 className="mb-10 mt-3 pb-1 text-xl font-semibold">
                        We are The DailyDocket Team
                      </h4>
                    </div>

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
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <input
                          type="submit"
                          value="Log in"
                          className="uppercase bg-gradient-to-r from-orange-500 via-red-600 to-[#b44593] text-white w-full mt-2 px-4 py-2 rounded-md hover:from-orange-600 hover:to-purple-700 focus:outline-none focus:shadow-outline-blue active:from-orange-800 active:to-purple-900"
                        />
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-center pb-6">
                        <p className="mb-0 mr-2">
                          Don&lsquo;t have an account?
                        </p>
                        <Link
                          to="/register"
                          className="uppercase bg-gradient-to-r from-orange-500 via-red-600 to-[#b44593] text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-purple-700 focus:outline-none focus:shadow-outline-blue active:from-orange-800 active:to-purple-900"
                        >
                          Register
                        </Link>
                      </div>
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
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
