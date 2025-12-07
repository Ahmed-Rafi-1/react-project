import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchProducts } from "../utils/api";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products by search
  const filteredProducts = searchQuery
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 p-8">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          All Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover {products.length} amazing products
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, brand, or category..."
            className="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Found {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <FaSearch className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No products match your search "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Simple Pagination */}
      {filteredProducts.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
