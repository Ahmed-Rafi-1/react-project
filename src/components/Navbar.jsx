import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  FaHome,
  FaShoppingBag,
  FaUser,
  FaSignOutAlt,
  FaShoppingCart,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ShopHub
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaHome />
              <span>Home</span>
            </Link>

            <Link
              to="/products"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FaShoppingBag />
              <span>Products</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <FaUser />
                  <span>Account</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    {currentUser.email?.split("@")[0]}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <Link
              to="/cart"
              className="md:hidden flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            mobileMenuOpen ? "block" : "hidden"
          } py-4 border-t border-gray-200 dark:border-gray-700`}
        >
          <div className="space-y-4">
            {/* Search Bar - Mobile */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              <FaHome />
              <span>Home</span>
            </Link>

            <Link
              to="/products"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              <FaShoppingBag />
              <span>Products</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              <FaShoppingCart />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  <FaUser />
                  <span>Account</span>
                </Link>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Logged in as:
                    </span>
                    <span className="text-sm font-medium">
                      {currentUser.email?.split("@")[0]}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors border border-blue-600 dark:border-blue-400 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
