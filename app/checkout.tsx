// app/checkout.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from './cartContext';
import api from './api/axios';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoLocationOutline, IoCardOutline } from 'react-icons/io5';

interface Address {
  id: number;
  full_name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  is_default: boolean;
}

const Checkout: React.FC = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const shippingCost = 5000;
  const tax = cartTotal * 0.075; // 7.5% VAT
  const total = cartTotal + shippingCost + tax;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/auth/addresses/');
      setAddresses(response.data);
      
      // Auto-select default address
      const defaultAddr = response.data.find((addr: Address) => addr.is_default);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr.id);
      } else if (response.data.length > 0) {
        setSelectedAddress(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/orders/checkout/', {
        shipping_address_id: selectedAddress,
        notes: notes,
      });

      // Redirect to Paystack payment page
      window.location.href = response.data.payment.authorization_url;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Checkout failed');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-rose-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/shop_all')}
            className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-rose-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200">
              <div className="flex items-center gap-3 mb-6">
                <IoLocationOutline size={28} className="text-rose-600" />
                <h2 className="text-2xl font-bold text-rose-900">Shipping Address</h2>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No addresses found</p>
                  <button
                    onClick={() => navigate('/profile')}
                    className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedAddress === address.id
                          ? 'border-rose-600 bg-rose-50'
                          : 'border-gray-200 hover:border-rose-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{address.full_name}</p>
                          <p className="text-gray-600 text-sm mt-1">
                            {address.line1}
                            {address.line2 && `, ${address.line2}`}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} {address.postal_code}
                          </p>
                          <p className="text-gray-600 text-sm">{address.phone}</p>
                          {address.is_default && (
                            <span className="inline-block mt-2 bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200">
              <h2 className="text-xl font-bold text-rose-900 mb-4">Order Notes (Optional)</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special instructions for your order..."
                rows={4}
                className="w-full px-4 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200">
              <h2 className="text-xl font-bold text-rose-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-rose-100 last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <div className="flex items-center text-rose-700 font-bold mt-1">
                        <TbCurrencyNaira size={18} />
                        <span>{Number(item.total_price).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-200 sticky top-24">
              <h2 className="text-2xl font-bold text-rose-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <div className="flex items-center font-semibold">
                    <TbCurrencyNaira size={18} />
                    <span>{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <div className="flex items-center font-semibold">
                    <TbCurrencyNaira size={18} />
                    <span>{shippingCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax (7.5%)</span>
                  <div className="flex items-center font-semibold">
                    <TbCurrencyNaira size={18} />
                    <span>{tax.toFixed(0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-rose-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-rose-900">Total</span>
                  <div className="flex items-center text-2xl font-bold text-rose-900">
                    <TbCurrencyNaira size={28} />
                    <span>{total.toFixed(0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || !selectedAddress}
                className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition font-bold text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <IoCardOutline size={24} />
                    Proceed to Payment
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Secured by <span className="font-semibold text-rose-600">Paystack</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;