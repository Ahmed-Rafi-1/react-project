import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchProducts, fetchCategories } from "../utils/api";
import {
  FaSearch,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaFire,
  FaStar,
} from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        setProducts(productsData.slice(0, 8));
        setFeaturedProducts(productsData.slice(0, 4)); // First 4 as featured
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 p-8">
        {error}
      </div>
    );

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Discover Amazing
          <span className="text-blue-600 dark:text-blue-400"> Products</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Shop the latest trends with best prices. Fast delivery & easy returns.
        </p>

        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Features */}

      {/* Categories */}

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FaFire className="text-3xl text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hot Deals
            </h2>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No products available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Top Rated Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FaStar className="text-3xl text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Top Rated
            </h2>
          </div>
        </div>

        {featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers. Shop with confidence with our
          30-day money-back guarantee.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
            Shop Now
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
            View Deals
          </button>
        </div>
      </section>
    </div>
  );
}
