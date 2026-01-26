import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api/axios";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoReceiptOutline, IoEyeOutline } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";

/* ---------- Types ---------- */
interface Order {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  total: number;
  created_at: string;
  items: Array<{
    id: number;
    product: { id: number; name: string; image?: string | null };
    quantity: number;
    price: number;
  }>;
}

/* Use a simple data URI placeholder instead of a file path */
const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23f8f9fa' width='150' height='150'/%3E%3Ctext x='50%25' y='50%25' font-size='14' text-anchor='middle' fill='%23dee2e6' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

/* Auth header helper */
const getAuthConfig = () => {
  const token = localStorage.getItem("token") || localStorage.getItem("access_token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [productCache, setProductCache] = useState<Record<number, { image?: string | null }>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const cfg = getAuthConfig();
      
      // Check if user is logged in
      if (!cfg) {
        console.log("No authentication token found");
        navigate("/login");
        return;
      }
      
      // baseURL already includes /api, so just use /orders/
      const resp = await api.get("/orders/", cfg);
      
      const data = Array.isArray(resp.data) ? resp.data : resp.data.results ?? resp.data;
      console.log("Fetched orders:", data); // Debug log
      
      // Check if orders already include product images
      if (data && data.length > 0) {
        console.log("Sample order item:", data[0]?.items?.[0]);
      }
      
      setOrders(data || []);
      
      // collect unique product ids and fetch them
      const ids = Array.from(
        new Set(
          (data || []).flatMap((o: any) => 
            (o.items || []).map((it: any) => it.product?.id ?? it.product_id)
          )
        )
      ).filter(Boolean) as number[];
      
      if (ids.length) await fetchProducts(ids);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // batch fetch product details
  const fetchProducts = async (ids: number[]) => {
    if (!ids || ids.length === 0) return;
    
    // only fetch those not in cache
    const toFetch = ids.filter((id) => !productCache[id]);
    if (toFetch.length === 0) return;

    try {
      // try batch endpoint first: /products/?ids=1,2,3
      const resp = await api.get(`/products/?ids=${toFetch.join(",")}`);
      const products = Array.isArray(resp.data) ? resp.data : resp.data.results ?? resp.data;
      const newCache = { ...productCache };
      
      products.forEach((p: any) => {
        newCache[p.id] = { image: p.image ?? p.image_url ?? null };
      });
      
      setProductCache(newCache);
    } catch (err) {
      // fallback: fetch individually
      const newCache = { ...productCache };
      await Promise.all(
        toFetch.map(async (id) => {
          try {
            const r = await api.get(`/products/${id}/`);
            newCache[id] = { image: r.data.image ?? r.data.image_url ?? null };
          } catch (e) {
            newCache[id] = { image: null };
          }
        })
      );
      setProductCache(newCache);
    }
  };

  const buildImageUrl = (image?: string | null) => {
    if (!image) return PLACEHOLDER;
    if (/^https?:\/\//i.test(image)) return image;
    
    // Your backend base URL
    const backendBase = "http://localhost:8000";
    
    // Handle both absolute and relative paths
    if (image.startsWith("/media/") || image.startsWith("/static/")) {
      return `${backendBase}${image}`;
    }
    return image.startsWith("/") ? `${backendBase}${image}` : `${backendBase}/${image}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <HiOutlineShoppingCart className="text-rose-300 text-8xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-rose-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your order history here!
          </p>
          <Link
            to="/shop_all"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center gap-3 mb-8 pt-8">
          <IoReceiptOutline className="text-rose-600 text-4xl" />
          <h1 className="text-4xl font-bold text-rose-900">Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-2 border-rose-100"
            >
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-start mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-lg font-bold text-rose-900">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="text-sm font-semibold text-gray-700">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.payment_status)}`}>
                    {order.payment_status?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-bold text-rose-900 flex items-center">
                    <TbCurrencyNaira className="text-xl" />
                    {order.total?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {(order.items || []).slice(0, 3).map((item) => {
                  // Try multiple sources for the image
                  const prodImage = 
                    (item as any).product_image || // From OrderItem.product_image field
                    item.product?.image_url ||      // From serializer's get_image_url
                    item.product?.image ||          // Direct image field
                    null;
                  
                  // Debug log
                  if (!prodImage) {
                    console.log('No image found for product:', item.product?.name, 'Item data:', item);
                  }
                  
                  return (
                    <div key={item.id} className="flex gap-3 items-center bg-rose-50 p-3 rounded-lg">
                      <img
                        src={buildImageUrl(prodImage)}
                        alt={item.product?.name ?? "product"}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-sm"
                        onError={(e) => { 
                          console.error('Image failed to load. URL was:', buildImageUrl(prodImage));
                          (e.target as HTMLImageElement).src = PLACEHOLDER; 
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {item.product?.name ?? "Product"}
                        </p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-rose-700 flex items-center">
                          <TbCurrencyNaira />
                          {item.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                
                {order.items && order.items.length > 3 && (
                  <div className="flex items-center justify-center bg-rose-50 rounded-lg p-3">
                    <p className="text-gray-500 text-sm font-medium">
                      +{order.items.length - 3} more items
                    </p>
                  </div>
                )}
              </div>

              {/* View Details Button */}
              <Link 
                to={`/orderDetails/${order.id}`}
                className="flex items-center justify-center gap-2 w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition font-semibold shadow-md hover:shadow-lg"
              >
                <IoEyeOutline size={20} /> 
                View Order Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;