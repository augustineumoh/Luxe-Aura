import React, { useState, useEffect, useRef } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "./api/axios"; // Use your existing axios instance

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string | number;
  category?: string;
  stock?: number;
  image?: string;
  images?: Array<{ image: string } | string>;
}

const SearchToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search - wait 300ms after user stops typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Use the custom search endpoint
      const response = await api.get(`/cart/products/search/?q=${encodeURIComponent(query)}`);
      
      const data = response.data;
      
      // Handle the response format from your backend
      const results = data.results || [];
      
      setSearchResults(results);
      setShowResults(true);
    } catch (error: any) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowResults(true); // Still show the "no results" message
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop all page with search query
      navigate(`/shop_all?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery("");
      setShowResults(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
    setShowResults(false);
  };

  // Get image URL helper function
  const getImageUrl = (product: Product): string | null => {
    // Try the image field first
    if (product.image) return product.image;
    
    // Try images array
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string') return firstImage;
      if (typeof firstImage === 'object' && firstImage.image) return firstImage.image;
    }
    
    return null;
  };

  return (
    <>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-rose-900 hover:text-rose-700 transition-colors duration-300 transform hover:scale-110"
        title="Search"
        type="button"
      >
        <IoSearchOutline size={24} />
      </button>

      {/* Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 animate-fadeIn">
          <div
            ref={searchRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-slideDown"
          >
            {/* Search Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <IoSearchOutline size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(e);
                  }
                }}
                placeholder="Search for products, perfumes, jewelry..."
                autoFocus
                className="w-full pl-12 pr-12 py-5 text-lg outline-none border-b-2 border-gray-200 focus:border-rose-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>

            {/* Search Results */}
            {showResults && (
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-600"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-rose-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {/* Product Image */}
                        {getImageUrl(product) ? (
                          <img
                            src={getImageUrl(product)!}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IoSearchOutline size={24} className="text-gray-400" />
                          </div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {product.category || product.description}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-rose-600">
                            ₦{parseFloat(product.price.toString()).toLocaleString()}
                          </p>
                          {product.stock !== undefined && (
                            <p className="text-xs text-gray-500">
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* View All Results Button */}
                    <button
                      onClick={(e) => handleSearchSubmit(e)}
                      type="button"
                      className="w-full py-4 text-center text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
                    >
                      View All Results ({searchResults.length})
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <IoSearchOutline size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No products found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Search Tips / Popular Searches */}
            {!showResults && searchQuery.length === 0 && (
              <div className="px-6 py-8">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Perfume", "Necklace", "Earrings", "Bracelet", "Ring"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      type="button"
                      className="px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm hover:bg-rose-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            {searchQuery.length > 0 && searchQuery.length < 2 && (
              <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                <p className="text-sm text-amber-800">
                  💡 Type at least 2 characters to search
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default SearchToggle;