import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-base-300">
      <div className="flex justify-center items-center bg-base-200 rounded p-4">
        <RotatingLines
          strokeColor="darkslategrey"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
