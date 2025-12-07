import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle, FaLock, FaEnvelope, FaShieldAlt } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later");
      } else {
        setError("Failed to sign in: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      setGoogleLoading(true);
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled");
      } else if (err.code === "auth/popup-blocked") {
        setError(
          "Popup was blocked by browser. Please allow popups for this site."
        );
      } else {
        setError("Failed to sign in with Google: " + err.message);
      }
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Continue your learning journey
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </div>
          )}

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium py-3 px-4 rounded-lg transition-all duration-200 mb-6"
          >
            {googleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <FaGoogle className="text-red-500" />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or login with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaLock className="inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaShieldAlt />
                <span>Secure login with industry-standard encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
