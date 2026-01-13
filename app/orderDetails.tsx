import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api/axios";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoArrowBack, IoReceiptOutline } from "react-icons/io5";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23f8f9fa' width='150' height='150'/%3E%3Ctext x='50%25' y='50%25' font-size='14' text-anchor='middle' fill='%23dee2e6' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";


const getAuthConfig = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("access_token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
};

const buildImageUrl = (image?: string | null, apiInstance?: any) => {
  if (!image) return PLACEHOLDER;
  if (/^https?:\/\//i.test(image)) return image;
  
  const base = apiInstance?.defaults?.baseURL?.replace(/\/$/, "") ?? window.location.origin;
  return image.startsWith("/") ? `${base}${image}` : `${base}/${image}`;
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }
    
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cfg = getAuthConfig();
        
        // Try the most likely endpoints in order
        const tryUrls = [
          `/auth/purchase-history/${id}/`,
          `/orders/${id}/`,
          `/api/orders/${id}/`,
        ];
        
        let res = null;
        let lastError = null;
        
        for (const url of tryUrls) {
          try {
            console.log(`Trying to fetch order from: ${url}`);
            res = await api.get(url, cfg);
            if (res?.status === 200 && res.data) {
              console.log(`Successfully fetched order from: ${url}`);
              break;
            }
          } catch (e: any) {
            console.log(`Failed to fetch from ${url}:`, e.message);
            lastError = e;
            // continue to next URL
          }
        }
        
        if (!res || !res.data) {
          throw lastError || new Error("Order not found");
        }
        
        setOrder(res.data);
      } catch (err: any) {
        console.error("Order fetch error:", err);
        if (err?.response?.status === 401) {
          setError("Authentication required. Please log in.");
          setTimeout(() => navigate("/login"), 2000);
        } else if (err?.response?.status === 404) {
          setError("Order not found.");
        } else {
          setError(err?.response?.data?.message || err.message || "Failed to load order details.");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid": case "completed": return "bg-green-100 text-green-700 border-green-300";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "failed": case "cancelled": return "bg-red-100 text-red-700 border-red-300";
      case "processing": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? "Error" : "404 - Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The requested order could not be found."}
          </p>
          <button 
            onClick={() => navigate("/orders")} 
            className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-semibold flex items-center gap-2 mx-auto"
          >
            <IoArrowBack /> Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-700 mb-6 font-semibold transition"
        >
          <IoArrowBack size={20} /> Back to Orders
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-rose-100">
          <div className="flex items-center gap-3 mb-6">
            <IoReceiptOutline className="text-rose-600 text-3xl" />
            <h1 className="text-3xl font-bold text-rose-900">Order Details</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold text-rose-900">{order.order_number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="text-base font-semibold text-gray-700">
                {formatDate(order.created_at)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusColor(order.payment_status)}`}>
                {order.payment_status?.toUpperCase() || "N/A"}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Total</p>
              <p className="text-2xl font-bold text-rose-900 flex items-center">
                <TbCurrencyNaira className="text-3xl" />
                {order.total?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-100">
          <h2 className="text-2xl font-bold text-rose-900 mb-6">Order Items</h2>
          
          <div className="space-y-4">
            {(order.items || []).map((item: any) => {
              const productImage = item.product_image || item.product?.image || null;
              const productName = item.product?.name || item.product_name || "Product";
              
              return (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-4 bg-rose-50 rounded-lg hover:bg-rose-100 transition"
                >
                  <img 
                    src={buildImageUrl(productImage, api)} 
                    alt={productName} 
                    className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER;
                    }} 
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{productName}</h3>
                    <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                    <p className="text-lg font-bold text-rose-700 flex items-center">
                      <TbCurrencyNaira className="text-xl" />
                      {item.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                    <p className="text-xl font-bold text-rose-900 flex items-center justify-end">
                      <TbCurrencyNaira className="text-2xl" />
                      {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center text-xl">
              <span className="font-bold text-gray-700">Total Amount:</span>
              <span className="font-bold text-rose-900 flex items-center text-2xl">
                <TbCurrencyNaira className="text-3xl" />
                {order.total?.toLocaleString() || "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;