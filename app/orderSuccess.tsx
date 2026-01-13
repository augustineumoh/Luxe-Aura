import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import api from "./api/axios";

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (reference) {
      verifyPayment(reference);
    } else {
      setVerifying(false);
      setError("No payment reference found in URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

 // Use this in your OrderSuccess / PaymentSuccess component
const getBackendOrigin = () => {
  // safe access to environment vars (works in CRA and other setups)
  const envUrl =
    typeof process !== "undefined" && process.env
      ? process.env.REACT_APP_BACKEND_URL || process.env.VITE_BACKEND_URL || ""
      : "";

  if (envUrl && envUrl.trim()) return envUrl.replace(/\/$/, "");

  // If running locally on the typical CRA port, assume backend on 8000
  try {
    if (window && window.location) {
      const host = window.location.hostname;
      const port = window.location.port;
      if (host === "localhost" && (port === "3000" || port === "5173")) {
        return "http://localhost:8000";
      }
    }
  } catch (e) {
    /* ignore */
  }

  // Last fallback — use same origin as the page
  return (window.location && window.location.origin) ? window.location.origin.replace(/\/$/, "") : "http://localhost:8000";
};

  const notifyOrdersUpdated = () => {
    try {
      window.dispatchEvent(new Event("ordersUpdated"));
    } catch {
      localStorage.setItem("ordersUpdatedAt", String(Date.now()));
    }
  };

  const fetchOrdersFallback = async (token: string | null) => {
    try {
      if (!token) return null;
      // Use your axios instance which should add baseURL (/api) — adjust if necessary
      const cfg = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get("/auth/purchase-history/", cfg);
      return res.data;
    } catch (err) {
      console.warn("fetchOrdersFallback failed:", err);
      return null;
    }
  };

  const verifyPayment = async (reference: string) => {
    setVerifying(true);
    setError("");
    setSuccess(false);

    const backendOrigin = getBackendOrigin();
    const verifyUrl = `${backendOrigin}/paystack/verify/?trxref=${encodeURIComponent(reference)}&reference=${encodeURIComponent(reference)}`;

    console.debug("PaymentSuccess: calling verifyUrl:", verifyUrl);

    const controller = new AbortController();
    const timeoutMs = 15000; // 15s
    const timer = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const resp = await fetch(verifyUrl, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (resp.ok) {
        const data = await resp.json();
        if (data && data.status === "success") {
          setSuccess(true);
          setOrder(data.order ?? data);
          notifyOrdersUpdated();
          setVerifying(false);
          return;
        }
        // server returned ok but status not success
        setError(data.message || "Verification returned a non-success result. You can retry.");
      } else if (resp.status === 401) {
        setError("Not authenticated to verify payment. Refresh and retry if you're logged in.");
      } else {
        const text = await resp.text().catch(() => "");
        try {
          const json = JSON.parse(text || "{}");
          setError(json.message || json.error || `Verification failed (status ${resp.status})`);
        } catch {
          setError(`Verification failed (status ${resp.status})`);
        }
      }
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        setError("Verification timed out. The server did not respond. Please try again.");
      } else {
        console.warn("PaymentSuccess verify fetch error:", err);
        setError(err?.message || "Network error while verifying payment. Please try again.");
      }
    } finally {
      setVerifying(false);
    }

    // fallback: check authenticated orders if token present
    const token = localStorage.getItem("access_token") || localStorage.getItem("token") || null;
    if (token) {
      const ordersData = await fetchOrdersFallback(token);
      if (ordersData) {
        const list = Array.isArray(ordersData) ? ordersData : ordersData.results ?? [];
        const matched = list.find((o: any) => o.paystack_reference === reference || (o.order_number && o.order_number.includes(reference)));
        if (matched) {
          const paid = matched.payment_status === "paid" || matched.status === "processing" || matched.payment_status === "successful";
          setSuccess(paid);
          setOrder(matched);
          if (paid) {
            notifyOrdersUpdated();
            setError("");
            return;
          } else {
            setError("Payment appears to be processing. Please check back shortly.");
            return;
          }
        }
      }
    }

    // final fallback message if nothing matched
    if (!error) setError("Payment verification failed or is still processing. Try refreshing in a few seconds.");
  };

  const handleRetry = () => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (reference) verifyPayment(reference);
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
              <p className="text-gray-600 mb-6">Thank you — your payment has been processed.</p>

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Verification</h1>
              <p className="text-gray-600 mb-4">{error}</p>

              <div className="space-y-3">
                <button onClick={() => navigate("/cart")} className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition font-semibold">
                  Return to Cart
                </button>
                <button onClick={handleRetry} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Retry Verification
                </button>
                <button onClick={() => navigate("/shop_all")} className="w-full bg-white text-rose-600 border border-rose-200 py-3 rounded-lg hover:bg-rose-50 transition font-semibold">
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