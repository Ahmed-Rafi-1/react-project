import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";

export default function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-gray-500 dark:text-gray-400 text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <div className="space-y-4">
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/"
              className="inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-8 rounded-lg transition-colors ml-4"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 dark:border-gray-700 py-6"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="ml-6 flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                        ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4 py-1 w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.originalPrice > item.price && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="mt-6">
              <button
                onClick={clearCart}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Inclusive of all taxes
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-200"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Free shipping on
                orders over $50
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">✓</span> 30-day return policy
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
