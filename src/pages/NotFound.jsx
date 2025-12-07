import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-800">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Lost in the learning journey?
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved. Don't
          worry, let's get you back on track!
        </p>

        <div className="space-y-4 max-w-md mx-auto">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <FaHome />
            Go Back Home
          </Link>

          <Link
            to="/courses"
            className="flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <FaSearch />
            Browse Courses
          </Link>
        </div>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <h3 className="font-bold mb-3">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Courses
            </Link>
            <Link
              to="/dashboard"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
