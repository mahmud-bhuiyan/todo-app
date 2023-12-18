import { Helmet } from "react-helmet-async";
import CustomFormLogo from "../form/CustomFormLogo";
import { logo } from "../../assets/images";
import CustomForm from "../form/CustomForm";
import { toast } from "react-toastify";

const Register = () => {
  const onSubmit = (data) => {
    console.log(data);
    toast.success("Logged In Successful");
  };

  const formFields = [
    {
      type: "text",
      name: "name",
      placeholder: "name",
      validation: {
        required: "name is required",
      },
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      type: "password",
      name: "password",
      placeholder: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        maxLength: {
          value: 20,
          message: "Password can not be more than 20 characters",
        },
      },
    },
    {
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      validation: {
        required: "Confirm Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        maxLength: {
          value: 20,
          message: "Password can not be more than 20 characters",
        },
      },
    },
  ];

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
                <div
                  className="flex items-center text-center lg:rounded-l-lg rounded-t-lg lg:rounded-tr-none lg:w-6/12 p-2 sm:p-16"
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
                      formFields={formFields}
                      formButton="register"
                      bottomText="Already have an account? Please"
                      bottomTitle="login"
                      bottomLink="/login"
                    />
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

export default Register;
