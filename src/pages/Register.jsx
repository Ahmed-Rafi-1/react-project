import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Please login instead.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please choose a stronger password");
      } else {
        setError("Failed to create account: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister() {
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
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account already exists with the same email but different sign-in method"
        );
      } else {
        setError("Failed to sign up with Google: " + err.message);
      }
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join thousands of learners worldwide
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

          {/* Google Register Button */}
          <button
            onClick={handleGoogleRegister}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium py-3 px-4 rounded-lg transition-all duration-200 mb-6"
          >
            {googleLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting with Google...</span>
              </>
            ) : (
              <>
                <FaGoogle className="text-red-500" />
                <span>Sign up with Google</span>
              </>
            )}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or sign up with email
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
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error && error.includes("email")
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
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
                  minLength="6"
                  placeholder="At least 6 characters"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error && error.includes("Password")
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Must be at least 6 characters long
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaLock className="inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    error && error.includes("match")
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      password === confirmPassword && password.length > 0
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Passwords must match
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <input type="checkbox" id="terms" required className="mt-1" />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaShieldAlt />
                <span>Your data is securely encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
