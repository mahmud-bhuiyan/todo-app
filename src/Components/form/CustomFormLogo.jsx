const CustomFormLogo = ({ logoSrc, text }) => {
  return (
    <div className="text-center">
      <img className="mx-auto w-16" src={logoSrc} alt="logo" />
      <h4 className="mb-6 mt-3 text-xl font-semibold">{text}</h4>
    </div>
  );
};

export default CustomFormLogo;
