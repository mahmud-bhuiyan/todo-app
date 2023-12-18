const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  register,
  errors,
  validation,
}) => {
  const commonProps = {
    className:
      "body-large mb-0 flex h-10 w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50",
    id: name,
    placeholder: placeholder,
    ...register(name, validation),
  };

  return (
    <div className="relative mb-4" data-te-input-wrapper-init>
      {label && <label htmlFor={name}>{label}</label>}
      {type === "date" ? (
        <input type="date" {...commonProps} />
      ) : type === "text" || type === "email" || type === "password" ? (
        <input type={type} {...commonProps} />
      ) : (
        <input type="text" {...commonProps} />
      )}
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomInput;
