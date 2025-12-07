import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaUser,
  FaShoppingBag,
  FaHistory,
  FaHeart,
  FaCog,
} from "react-icons/fa";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [recentProducts, setRecentProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    async function loadProducts() {
      try {
        const allProducts = await fetchProducts();
        // Simulating recently viewed products
        const recent = allProducts.slice(0, 3);
        setRecentProducts(recent);
        // Simulating wishlist
        const wishlistItems = allProducts.slice(3, 6);
        setWishlist(wishlistItems);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentUser.email?.split("@")[0]}! 🛍️
            </h1>
            <p className="text-blue-100">Manage your account and orders</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm">Member since</p>
                <p className="font-semibold">
                  {new Date(
                    currentUser.metadata.creationTime
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 font-medium ${
                activeTab === "orders"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaShoppingBag className="inline mr-2" />
              My Orders
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`pb-4 font-medium ${
                activeTab === "wishlist"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaHeart className="inline mr-2" />
              Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-4 font-medium ${
                activeTab === "history"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaHistory className="inline mr-2" />
              Order History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-4 font-medium ${
                activeTab === "settings"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaCog className="inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #ORD-12345</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on Jan 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$129.99</p>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #ORD-12344</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on Jan 10, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$89.99</p>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                      Shipped
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <h3 className="text-xl font-bold mb-4">
              My Wishlist ({wishlist.length} items)
            </h3>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlist.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FaHeart className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Your wishlist is empty.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Order History</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No order history available.
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser.email}
                </p>
              </div>
              <div>
                <p className="font-medium">Account Created</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(
                    currentUser.metadata.creationTime
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recently Viewed</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Clear History
          </button>
        </div>

        {recentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              No recently viewed products.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
