// app/cart.tsx
import React from 'react';
import { useCart } from './cartContext';
import { Link } from 'react-router';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoTrashOutline } from 'react-icons/io5';
import { BsBag } from 'react-icons/bs';

const Cart: React.FC = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart, loading } = useCart();

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-900 mx-auto mb-4"></div>
          <p className="text-rose-900 text-lg font-semibold">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-rose-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
            <BsBag size={64} className="text-rose-900" />
          </div>
          <h2 className="text-3xl font-bold text-rose-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            to="/shop_all"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-rose-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-semibold"
          >
            <IoTrashOutline size={20} />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-rose-100"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full sm:w-32 h-32 bg-rose-50 rounded-lg overflow-hidden">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-300">
                          <BsBag size={48} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-rose-900 mb-1">
                            {item.product.name}
                          </h3>
                          <span className="inline-block bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {item.product.category}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                          title="Remove item"
                        >
                          <IoTrashOutline size={20} />
                        </button>
                      </div>

                      <div className="flex items-center text-rose-700 font-bold text-xl mt-3">
                        <TbCurrencyNaira size={24} />
                        <span>{Number(item.product.price).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-rose-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-rose-100 transition disabled:opacity-40 disabled:cursor-not-allowed text-rose-900 font-bold"
                        >
                          −
                        </button>
                        <span className="w-12 text-center font-bold text-rose-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.product.stock || 999)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-rose-100 transition disabled:opacity-40 disabled:cursor-not-allowed text-rose-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Item Total</p>
                        <div className="flex items-center justify-end text-rose-900 font-bold text-xl">
                          <TbCurrencyNaira size={24} />
                          <span>{Number(item.total_price).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border-2 border-rose-200">
              <h2 className="text-2xl font-bold text-rose-900 mb-6 pb-4 border-b-2 border-rose-100">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal</span>
                  <div className="flex items-center font-semibold">
                    <TbCurrencyNaira size={20} />
                    <span>{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className="text-sm text-gray-500">Calculated at checkout</span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Tax</span>
                  <span className="text-sm text-gray-500">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t-2 border-rose-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-rose-900">Total</span>
                  <div className="flex items-center text-2xl font-bold text-rose-900">
                    <TbCurrencyNaira size={28} />
                    <span>{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
              <button className="w-full bg-rose-600 text-white py-4 rounded-lg hover:bg-rose-700 transition-colors font-bold text-lg shadow-lg hover:shadow-xl mb-4">
                Proceed to Checkout
              </button>
              </Link>

              <Link
                to="/shop_all"
                className="block text-center text-rose-600 hover:text-rose-700 font-semibold transition"
              >
                ← Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-rose-100 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✓</span>
                  </div>
                  <span>Free Shipping on Orders Over ₦100,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <span>Easy Returns Within 30 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;