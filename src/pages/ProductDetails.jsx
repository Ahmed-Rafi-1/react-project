import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaStar, FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Add product to cart
    addToCart(product, quantity);
    setAddedToCart(true);

    // Show success message
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Add to cart first, then go to checkout
    addToCart(product, quantity);
    navigate(`/checkout/${id}?quantity=${quantity}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400 p-8">
        {error}
      </div>
    );
  if (!product) return <div className="text-center p-8">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span>Home</span> / <span>Products</span> /{" "}
        <span className="font-medium">{product.title.substring(0, 30)}...</span>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <FaStar className="text-yellow-500" />
                <span className="font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 w-16 text-center">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {product.stock} units available
                </div>
              </div>
            </div>

            {/* Success Message */}
            {addedToCart && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-700 dark:text-green-400 font-medium">
                  ✓ Added {quantity} × {product.title} to cart!
                </p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Go to{" "}
                  <a href="/cart" className="underline">
                    Cart
                  </a>{" "}
                  to checkout
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                <FaShoppingCart />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Simple Shipping Info */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✓ {product.shipping}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="text-xl font-bold mb-4">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
