import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextarea";
// import CustomSelect from "./CustomSelect";
import { customButtonStyle } from "./CustomButtonStyle";
import AuthPrompt from "./AuthPrompt";

const CustomForm = ({
  formTitle,
  onSubmit,
  formFields,
  formButton,
  bottomText,
  bottomTitle,
  bottomLink,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 text-center font-semibold capitalize">{formTitle}</p>
      {formFields.map((field) => {
        switch (field.type) {
          case "textarea":
            return (
              <CustomTextarea
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                register={register}
                errors={errors}
                validation={field.validation}
              />
            );
          // case "select":
          //   return (
          //     <CustomSelect
          //       key={field.name}
          //       name={field.name}
          //       options={field.options}
          //       register={register}
          //       errors={errors}
          //       validation={field.validation}
          //     />
          //   );
          default:
            return (
              <CustomInput
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                register={register}
                errors={errors}
                validation={field.validation}
              />
            );
        }
      })}

      {/* Submit button */}
      <div className="mb-10 text-center">
        <input
          type="submit"
          value={formButton}
          className={`w-full mt-2 ${customButtonStyle}`}
        />
      </div>

      {/* Bottom text and link */}
      <AuthPrompt text={bottomText} name={bottomTitle} link={bottomLink} />
    </form>
  );
};

export default CustomForm;
