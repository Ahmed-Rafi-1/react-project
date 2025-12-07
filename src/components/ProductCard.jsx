import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaStar, FaShoppingCart, FaTag, FaEye, FaFire } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {product.sold > 3000 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <FaFire size={10} />
            Hot
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Quick View
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 h-14">
          <Link
            to={`/product/${product.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold text-gray-900 dark:text-white">
              {product.rating}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              ({product.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            <FaEye />
            View
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
