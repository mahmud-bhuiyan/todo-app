export const LoginFormFields = [
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
];
