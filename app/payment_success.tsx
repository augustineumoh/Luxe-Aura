import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";

/**
 * PaymentSuccess component
 * - Reads ?reference=... from URL
 * - Calls backend public verify endpoint at `${BACKEND_ORIGIN}/paystack/verify/`
 *   BACKEND_ORIGIN is taken from environment variable REACT_APP_BACKEND_URL (recommended),
 *   otherwise falls back to window.location.origin.
 *
 * Usage:
 * - Ensure FRONTEND_URL in Django settings points to your frontend origin.
 * - Ensure checkout() sets callback_url to `${FRONTEND_URL}/payment-success`.
 * - Ensure backend exposes public verify view at /paystack/verify/ (as implemented earlier).
 * - Optionally set REACT_APP_BACKEND_URL in your frontend .env to backend origin (e.g. http://localhost:8000).
 */

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (reference) {
      verifyPayment(reference);
    } else {
      setVerifying(false);
      setError("No payment reference found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getBackendOrigin = () => {
    // Prefer explicit env var (useful if backend lives on a different origin)
    // e.g. REACT_APP_BACKEND_URL=http://localhost:8000
    return (process.env.REACT_APP_BACKEND_URL && process.env.REACT_APP_BACKEND_URL.replace(/\/$/, "")) || window.location.origin;
  };

  const verifyPayment = async (reference: string) => {
    try {
      setVerifying(true);
      setError("");

      const backendOrigin = getBackendOrigin();
      const verifyUrl = `${backendOrigin}/paystack/verify/?trxref=${encodeURIComponent(reference)}&reference=${encodeURIComponent(reference)}`;

      const res = await fetch(verifyUrl, {
        method: "GET",
        credentials: "include", // include cookies if same-origin auth is used (optional)
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setSuccess(true);
        setOrder(data.order ?? data);
      } else {
        setSuccess(false);
        setError(data.message || data.error || "Payment verification failed");
      }
    } catch (err: any) {
      console.error("Payment verification failed:", err);
      setSuccess(false);
      setError(err?.message || "Payment verification failed");
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-900 mx-auto mb-4"></div>
          <p className="text-xl text-rose-900 font-semibold">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {success ? (
            <>
              <IoCheckmarkCircle className="text-green-500 text-7xl mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">Thank you for your order. Your payment has been processed successfully.</p>

              {order && (
                <div className="bg-rose-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="text-lg font-bold text-rose-900">{order.order_number}</p>
                  <p className="text-sm text-gray-600 mt-2">Total Amount</p>
                  <p className="text-lg font-bold text-rose-900 flex items-center">
                    <TbCurrencyNaira size={24} />
                    {Number(order.total ?? order.amount ?? 0).toLocaleString()}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button onClick={() => navigate("/orders")} className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition font-semibold">
                  View Order Details
                </button>
                <button onClick={() => navigate("/shop_all")} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <>
              <IoCloseCircle className="text-red-500 text-7xl mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification Failed</h1>
              <p className="text-gray-600 mb-6">{error}</p>

              <div className="space-y-3">
                <button onClick={() => navigate("/cart")} className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition font-semibold">
                  Return to Cart
                </button>
                <button onClick={() => navigate("/shop_all")} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;