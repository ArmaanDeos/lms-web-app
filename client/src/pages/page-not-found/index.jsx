import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white text-center">
      <h1 className="text-6xl font-bold animate-bounce">404</h1>
      <p className="mt-4 text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="relative my-8">
        <div className="w-24 h-24 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-28 left-0 w-24 h-2 bg-black bg-opacity-20 rounded-full animate-pulse"></div>
      </div>
      <Link
        to="/"
        className="px-6 py-2 bg-white text-blue-900 rounded-md font-semibold shadow-lg transform hover:scale-105 transition-transform"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
