import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaShieldAlt,
} from "react-icons/fa";

export default function Checkout() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  function handlePlaceOrder() {
    // Simulate order processing
    setLoading(true);
    setTimeout(() => {
      setPurchaseSuccess(true);
      setLoading(false);
    }, 2000);
  }

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  if (loading && !purchaseSuccess) return <LoadingSpinner />;

  if (purchaseSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 dark:text-green-400 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 Purchase Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            You have successfully purchased{" "}
            <strong className="text-gray-900 dark:text-white">
              "{product?.title}"
            </strong>
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-16 h-16 object-contain"
              />
              <div className="text-left">
                <p className="font-medium">{product?.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quantity: {quantity}
                </p>
                <p className="font-bold">
                  ${(product?.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <FaTruck className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm">Shipping: {product?.shipping}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBox className="text-green-600 dark:text-green-400" />
                <span className="text-sm">
                  Order #: {Math.floor(Math.random() * 1000000)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-500 mb-8">
            Check your email for order confirmation and tracking details.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              View Order in Dashboard
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Complete Your Purchase
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>

          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg mb-6">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <div className="flex-grow">
              <h4 className="font-bold text-gray-900 dark:text-white">
                {product?.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Brand: {product?.brand}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${product?.price}
              </p>
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
                    setQuantity(Math.min(product?.stock || 10, quantity + 1))
                  }
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {product?.stock} units available
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Product Price</span>
              <span>
                ${product?.price} × {quantity}
              </span>
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
                <span>${totalPrice}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                One-time payment • No subscription
              </p>
            </div>
          </div>

          {/* Order Protection */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <p className="font-medium text-sm">Order Protection</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  30-day return policy • 1-year warranty • Secure payment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Payment Details</h3>

          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Customer:</strong> {currentUser?.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your payment is processed securely through our payment partner.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-4">Select Payment Method</h4>
            <div className="space-y-3">
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <FaCreditCard className="mr-3 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pay with your card
                  </p>
                </div>
              </label>

              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "paypal"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <FaPaypal className="mr-3 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pay with your PayPal account
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <FaLock />
            <span>Your payment is secure and encrypted</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </span>
            ) : (
              `Complete Purchase - $${totalPrice}`
            )}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            By completing your purchase, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
