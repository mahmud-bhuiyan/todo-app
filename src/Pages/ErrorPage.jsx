import { Helmet } from "react-helmet-async";
import { sadEmoji } from "../assets/images";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <Helmet>
        <title>ERROR | DailyDocket</title>
      </Helmet>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <img className="w-16" src={sadEmoji} alt="sad emoji" />
        </div>
        <h2 className="mb-4 text-6xl font-semibold text-red-400">404! </h2>
        <h1 className="mb-4 text-6xl font-semibold text-blue-400">
          Page Not Found
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>

        <p className="mt-4 text-gray-600">
          Go back to{" "}
          <Link to="/" className="text-blue-500 font-bold">
            Homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
