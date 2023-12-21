const CustomFormInput = ({
  label,
  type,
  id,
  register,
  name,
  error,
  placeholder,
  maxLength,
  value,
  className,
}) => {
  const inputClass = `body-large mb-0 flex h-${
    type === "textarea" ? 20 : 10
  } w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50 ${
    className || ""
  }`;

  return (
    <div className="pt-2">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          className={inputClass}
          placeholder={placeholder}
          defaultValue={value}
          {...register(name, {
            required: `${label} is required`,
            maxLength: maxLength && {
              value: maxLength,
              message: `${label} can not exceed ${maxLength} characters`,
            },
          })}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          {...register(name, {
            required: `${label} is required`,
            maxLength: maxLength && {
              value: maxLength,
              message: `${label} can not exceed ${maxLength} characters`,
            },
          })}
        />
      )}
      {error && <span className="text-red-500 text-sm ">{error.message}</span>}
    </div>
  );
};

export default CustomFormInput;
