import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // <-- fixed import
import { IoPersonOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import logo from "./main logo.png";
import SearchToggle from "./search";
import { useCart } from "./cartContext";
import { IoHeartOutline } from "react-icons/io5";
import { IoReceiptOutline } from "react-icons/io5";
import { useWishlist } from "./wishlistContext";
import api from "./api/axios";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [orderCount, setOrderCount] = useState(0);
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();

  // keep ref for interval so we can clear on unmount
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // whenever user changes (login/logout), fetch order count
    if (user) fetchOrderCount();
    else setOrderCount(0);
    // also set up listeners for updates
    const onOrdersUpdated = () => {
      fetchOrderCount();
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ordersUpdatedAt") fetchOrderCount();
    };

    window.addEventListener("ordersUpdated", onOrdersUpdated);
    window.addEventListener("storage", onStorage);

    // periodic refresh (optional) - keeps badge fresh if something changed elsewhere
    intervalRef.current = window.setInterval(() => {
      if (user) fetchOrderCount();
    }, 60000); // every 60s

    return () => {
      window.removeEventListener("ordersUpdated", onOrdersUpdated);
      window.removeEventListener("storage", onStorage);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // use effect to keep user state in sync with localStorage (in case auth changed elsewhere)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "user") {
        const newUser = e.newValue ? JSON.parse(e.newValue) : null;
        setUser(newUser);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const fetchOrderCount = async () => {
    try {
      // use the same endpoint you used on the orders page
      const response = await api.get("/auth/purchase-history/");

      // Normalize different response shapes:
      // - If API returns array -> use its length
      // - If API returns paginated object: { results: [...], count: n } -> use count if present, otherwise results.length
      // - If API returns object list under data.results -> handle that too
      const data = response.data;
      let total = 0;

      if (Array.isArray(data)) {
        total = data.length;
      } else if (data && typeof data === "object") {
        if (typeof data.count === "number") {
          total = data.count;
        } else if (Array.isArray(data.results)) {
          total = data.results.length;
        } else {
          // fallback: try to interpret keys as list
          total = 0;
        }
      }

      // set orderCount to total orders (so it matches Orders page)
      setOrderCount(total);
    } catch (error: any) {
      console.error("Error fetching order count:", error);
      // If unauthorized, clear badges and user
      if (error?.response?.status === 401) {
        setOrderCount(0);
        // Optionally log user out
        // handleLogout();
      } else {
        // don't overwrite with zero aggressively; but safe fallback:
        setOrderCount(0);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFFFF0] backdrop-blur-lg bg-opacity-95 shadow-lg"
            : "bg-gradient-to-b from-[#FFFFF0]/80 to-transparent backdrop-blur-sm"
        }`}
        data-aos="fade-down"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Left - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/new_product" className="relative text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors duration-300 group">
                New
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/perfume" className="relative text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors duration-300 group">
                Perfume
                <span className="absolute -bottom-1 left-0 w-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/jewery" className="relative text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors duration-300 group">
                Jewelries
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/shop_all" className="relative text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors duration-300 group">
                Shop All
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Center - Logo */}
            <div className="flex-shrink-0">
              <Link to="/mainpage" className="block transform hover:scale-105 transition-transform duration-300">
                <img src={logo} alt="Luxe Aura Logo" className="h-12 lg:h-16 w-auto" width={180} />
              </Link>
            </div>

            {/* Right - Icons (Desktop) */}
            <div className="hidden lg:flex items-center gap-5">
              <SearchToggle />

              {/* Wishlist Icon with Badge */}
              <Link to="/wishlist" className="relative text-rose-900 hover:text-rose-700 transition-colors duration-300 transform hover:scale-110" title="Wishlist">
                <IoHeartOutline size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-bounce">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Orders Icon with Badge */}
              <Link to="/orders" className="relative text-rose-900 hover:text-rose-700 transition-colors duration-300 transform hover:scale-110" title="Orders">
                <IoReceiptOutline size={24} />
                {orderCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                    {orderCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Badge */}
              <Link to="/cart" className="relative text-rose-900 hover:text-rose-700 transition-colors duration-300 transform hover:scale-110" title="Shopping Cart">
                <BsBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile or Login */}
              {user ? (
                <div className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none group">
                    {user.profile_picture_url ? (
                      <img src={user.profile_picture_url} alt={user.username} className="w-10 h-10 rounded-full object-cover border-2 border-rose-300 group-hover:border-rose-500 transition-all duration-300" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-2 border-rose-300 group-hover:border-rose-500 transition-all duration-300 group-hover:shadow-lg">
                        <span className="text-white font-bold text-sm">{user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}</span>
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 animate-fadeIn">
                        <div className="px-5 py-4 border-b border-gray-100">
                          <p className="text-sm font-bold text-gray-900">{user.first_name || user.username}</p>
                          <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                            <IoPersonOutline size={18} /> My Profile
                          </Link>
                          <Link to="/wishlist" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                            <IoHeartOutline size={18} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                          </Link>
                          <Link to="/orders" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                            <IoReceiptOutline size={18} /> My Orders {orderCount > 0 && `(${orderCount})`}
                          </Link>
                          <Link to="/cart" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                            <BsBag size={18} /> My Cart {cartCount > 0 && `(${cartCount})`}
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 pt-2">
                          <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-rose-900 hover:text-rose-700 transition-colors duration-300">
              {mobileMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <div className="bg-[#FFFFF0] border-t border-rose-200 shadow-lg">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <Link to="/new_product" className="block text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>New</Link>
              <Link to="/perfume" className="block text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Perfume</Link>
              <Link to="/jewery" className="block text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Jewelries</Link>
              <Link to="/shop_all" className="block text-rose-900 font-bold uppercase tracking-wide text-sm hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Shop All</Link>

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-rose-200 space-y-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 pb-2">
                      {user.profile_picture_url ? (
                        <img src={user.profile_picture_url} alt={user.username} className="w-12 h-12 rounded-full object-cover border-2 border-rose-300" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center border-2 border-rose-300">
                          <span className="text-white font-bold text-lg">{user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{user.first_name || user.username}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 text-rose-900 hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}><IoPersonOutline size={20} /> My Profile</Link>
                    <Link to="/wishlist" className="flex items-center gap-3 text-rose-900 hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}><IoHeartOutline size={20} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link>
                    <Link to="/orders" className="flex items-center gap-3 text-rose-900 hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}><IoReceiptOutline size={20} /> My Orders {orderCount > 0 && `(${orderCount})`}</Link>
                    <Link to="/cart" className="flex items-center gap-3 text-rose-900 hover:text-rose-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}><BsBag size={20} /> My Cart {cartCount > 0 && `(${cartCount})`}</Link>
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="w-full text-left text-red-600 hover:text-red-700 transition-colors py-2 font-medium">Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="block w-full text-center bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors font-semibold" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                )}
              </div>

              {/* Mobile Search */}
              <div className="flex items-center justify-center pt-4">
                <SearchToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;