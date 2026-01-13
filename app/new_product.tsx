import React, { useMemo, useState } from "react";
import ruby from "./Ruby Radiance Ring.jpg";
import oud from "./new product1.jpg";
import emrald from "./Emerald Muse Earrings.jpg";
import jasmine from "./Jasmine Veil Eau de Parfum.jpg";
import img from "./new product_hero.jpg";
import { TbCurrencyNaira } from "react-icons/tb";
import oud1 from "./Oud Noir Parfum.jpg";
import palazzo from "./Palazzo Nobile Blooming Ballet.jpg";
import diamond from "./Diamond Whisper Bracelet.jpg";
import halo from "./Golden Halo Necklace.jpg";
import pearl from "./Pearl Grace Studs.jpg";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useCart } from "./cartContext";
import { useWishlist } from "./wishlistContext";

/* -------------------------------
   Types
-------------------------------- */
type Category = "Perfume" | "Jewelry";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  isNew: boolean;
  isLimited?: boolean;
  description?: string;
  launchDate?: string; // ISO date
}

/* -------------------------------
   Sample data (replace with API)
-------------------------------- */
const products: Product[] = [
  {
    id: 1,
    name: "Ruby Radiance Ring",
    category: "Jewelry",
    price: 62000,
    image: ruby,
    isNew: true,
    isLimited: true,
    description: "A hand-cut ruby set in gold, designed to captivate with fiery elegance.",
    launchDate: "2025-11-23",
  },
  {
    id: 2,
    name: "Verset parfum - Sofia",
    category: "Perfume",
    price: 140000,
    image: oud,
    isNew: true,
    description: "Blackcurrant and May rose meet amber and musk — modern & charismatic.",
    launchDate: "2025-11-28",
  },
  {
    id: 3,
    name: "Emerald Muse Earrings",
    category: "Jewelry",
    price: 28000,
    image: emrald,
    isNew: true,
    description: "Vivid emerald stones in a sleek silhouette — refined luxury.",
    launchDate: "2025-11-12",
  },
  {
    id: 8,
    name: "Diamond Whisper Bracelet",
    category: "Jewelry",
    price: 58000,
    image: diamond,
    isNew: true,
    description: "Delicate diamonds on a gold chain, whispering elegance.",
    launchDate: "2025-11-29",
  },
  {
    id: 9,
    name: "Golden Halo Necklace",
    category: "Jewelry",
    price: 60000,
    image: halo,
    isNew: true,
    description: "Minimalist gold pendant that glows with warmth.",
    launchDate: "2025-11-27",
  },
  {
    id: 10,
    name: "Pearl Grace Studs",
    category: "Jewelry",
    price: 63000,
    image: pearl,
    isNew: true,
    description: "Classic freshwater pearls in a modern setting.",
    launchDate: "2025-11-25",
  },
  {
    id: 4,
    name: "Jasmine Veil Eau de Parfum",
    category: "Perfume",
    price: 55000,
    image: jasmine,
    isNew: true,
    description: "Airy jasmine layered with soft vanilla.",
    launchDate: "2025-11-10",
  },
  {
    id: 5,
    name: "Oud Noir Parfum",
    category: "Perfume",
    price: 50000,
    image: oud1,
    isNew: true,
    description: "Smoky oud and warm amber — evening sophistication.",
    launchDate: "2025-11-20",
  },
  {
    id: 6,
    name: "Palazzo Nobile Blooming Ballet",
    category: "Perfume",
    price: 52000,
    image: palazzo,
    isNew: true,
    description: "A romantic floral bouquet with peony and rose.",
    launchDate: "2025-11-12",
  },
  {
    id: 7,
    name: "Chanel Chance Eau Tendre",
    category: "Perfume",
    price: 42000,
    image: palazzo,
    isNew: true,
    description: "Luminous floral-fruity blend — soft and joyful.",
    launchDate: "2025-11-22",
  },
];

/* -------------------------------
   Small helpers
-------------------------------- */
const formatPrice = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 0 });

/* -------------------------------
   ProductCard component
-------------------------------- */
type ProductCardProps = {
  product: Product;
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number, e?: React.MouseEvent<HTMLButtonElement>) => void;
  isWishlisted: (id: number) => boolean;
  addingToCart: number | null;
  cartLoading: boolean;
  wishlistLoading: number | null;
  messages: { [key: number]: string };
};

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  addingToCart,
  cartLoading,
  wishlistLoading,
  messages,
}: ProductCardProps) {
  const wishlisted = isWishlisted(product.id);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl flex flex-col transition transform hover:-translate-y-2">
      <div className="relative">
        {product.isLimited && (
          <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-3 py-1 rounded-full shadow">Limited</span>
        )}
        <button
          type="button"
          onClick={(e) => onToggleWishlist(product.id, e)}
          disabled={wishlistLoading === product.id}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-rose-50 z-10 disabled:opacity-50"
        >
          {wishlistLoading === product.id ? (
            <div className="animate-spin h-5 w-5 border-2 border-rose-600 border-t-transparent rounded-full" />
          ) : wishlisted ? (
            <IoHeart className="text-rose-600" size={20} />
          ) : (
            <IoHeartOutline className="text-gray-400" size={20} />
          )}
        </button>

        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-rose-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-1">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-rose-700 font-bold flex items-center">
            <TbCurrencyNaira className="mr-1" />
            <span>{formatPrice(product.price)}</span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            disabled={addingToCart === product.id || cartLoading}
            className={`py-2 px-3 rounded-lg font-semibold transition ${
              addingToCart === product.id ? "bg-rose-400 text-white cursor-wait" : "bg-rose-600 text-white hover:bg-rose-700"
            } disabled:opacity-50`}
          >
            {addingToCart === product.id ? "Adding..." : "Add"}
          </button>
        </div>

        {messages[product.id] && (
          <p className={`text-sm mt-3 text-center ${messages[product.id].includes("✓") ? "text-green-600" : "text-red-600"}`}>
            {messages[product.id]}
          </p>
        )}
      </div>
    </article>
  );
}

/* -------------------------------
   Page component
-------------------------------- */
const NewProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | Category>("All");
  const [sortOption, setSortOption] = useState<"Newest" | "LowToHigh" | "HighToLow">("Newest");

  // Featured product (newest by launchDate)
  const featuredProduct = useMemo<Product | undefined>(() => {
    return [...products]
      .filter((p) => p.isNew)
      .sort((a, b) => (b.launchDate ? Date.parse(b.launchDate) : 0) - (a.launchDate ? Date.parse(a.launchDate) : 0))[0];
  }, []);

  // Filter + search + sort
  const visibleProducts = useMemo<Product[]>(() => {
    const term = (searchTerm ?? "").toLowerCase().trim();
    let list = products.filter((p) => p.isNew);

    if (categoryFilter !== "All") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (term) {
      list = list.filter((p) => p.name.toLowerCase().includes(term) || (p.description ?? "").toLowerCase().includes(term));
    }

    if (sortOption === "Newest") {
      list = [...list].sort((a, b) => (b.launchDate ? Date.parse(b.launchDate) : 0) - (a.launchDate ? Date.parse(a.launchDate) : 0));
    } else if (sortOption === "LowToHigh") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === "HighToLow") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchTerm, categoryFilter, sortOption]);

  // cart & wishlist
  const { addToCart, loading: cartLoading } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: string }>({});

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState<number | null>(null);

  const toggleWishlist = async (productId: number, event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    event?.preventDefault();
    try {
      setWishlistLoading(productId);
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        setMessages((prev) => ({ ...prev, [productId]: "Removed from wishlist" }));
      } else {
        await addToWishlist(productId);
        setMessages((prev) => ({ ...prev, [productId]: "✓ Added to wishlist" }));
      }
      setTimeout(() => setMessages((prev) => ({ ...prev, [productId]: "" })), 2000);
    } catch (err: any) {
      console.error("Wishlist error:", err);
      setMessages((prev) => ({ ...prev, [productId]: "Failed to update wishlist" }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [productId]: "" })), 3000);
    } finally {
      setWishlistLoading(null);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      setAddingToCart(productId);
      await addToCart(productId, 1);
      setMessages((prev) => ({ ...prev, [productId]: "✓ Added to cart!" }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [productId]: "" })), 2000);
    } catch (err: any) {
      console.error("Add to cart error:", err);
      const errorMsg = err?.response?.data?.error || err?.message || "Failed to add to cart";
      setMessages((prev) => ({ ...prev, [productId]: errorMsg }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [productId]: "" })), 3000);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0]">
     {/* Hero */}
      <section
        className="relative bg-center bg-cover h-[100vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
    <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
      <h1 className="text-4xl font-bold mb-4">Introducing Our Latest Aura</h1>
      <p className="text-lg mb-8 font-bold">Crafted to inspire. Designed to shine. Explore our newest fragrances and jewelry.
    </p>
      <button className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition" data-aos="">Shop New Arrivals</button>
    </div>
  </div>
      </section>

      {/* Featured Product */}
      {featuredProduct && (
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              {featuredProduct.isLimited && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs px-3 py-1 rounded-full shadow">Limited Edition</span>
              )}

              <button
                type="button"
                onClick={(e) => toggleWishlist(featuredProduct.id, e)}
                disabled={wishlistLoading === featuredProduct.id}
                aria-label="Toggle wishlist"
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-rose-50 z-10 disabled:opacity-50"
              >
                {wishlistLoading === featuredProduct.id ? (
                  <div className="animate-spin h-6 w-6 border-2 border-rose-600 border-t-transparent rounded-full" />
                ) : isInWishlist(featuredProduct.id) ? (
                  <IoHeart className="text-rose-600" size={22} />
                ) : (
                  <IoHeartOutline className="text-gray-400" size={22} />
                )}
              </button>

              <img src={featuredProduct.image} alt={featuredProduct.name} className="rounded-lg shadow-lg w-full h-[480px] object-cover" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-rose-900 font-bold">{featuredProduct.name}</h2>
              <p className="mt-4 text-rose-800">{featuredProduct.description}</p>

              <p className="mt-6 text-sm text-rose-900">{featuredProduct.category}</p>
              <p className="mt-2 text-rose-700 text-3xl font-bold flex items-center">
                <TbCurrencyNaira className="mr-1" />
                {formatPrice(featuredProduct.price)}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleAddToCart(featuredProduct.id)}
                  disabled={addingToCart === featuredProduct.id || cartLoading}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${addingToCart === featuredProduct.id ? "bg-rose-400 text-white cursor-wait" : "bg-rose-600 text-white hover:bg-rose-700"} disabled:opacity-50`}
                >
                  {addingToCart === featuredProduct.id ? "Adding..." : "Add to Cart"}
                </button>

                <a href={`/product/${featuredProduct.id}`} className="inline-block text-rose-600 border border-rose-600 px-5 py-3 rounded-lg hover:bg-rose-50 transition">View Details</a>
              </div>

              {messages[featuredProduct.id] && (
                <p className={`mt-4 text-sm ${messages[featuredProduct.id].includes("✓") ? "text-green-600" : "text-red-600"}`}>
                  {messages[featuredProduct.id]}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-rose-500 via-rose-200 to-rose-500 mx-auto my-4"></div>

      {/* Controls */}
      <section id="new-arrivals" className="py-10 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <input
              type="text"
              placeholder="Search new products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-rose-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as "All" | Category)}
              className="w-full md:w-1/4 px-4 py-2 border border-rose-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="All">All Categories</option>
              <option value="Perfume">Perfume</option>
              <option value="Jewelry">Jewelry</option>
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as "Newest" | "LowToHigh" | "HighToLow")}
              className="w-full md:w-1/4 px-4 py-2 border border-rose-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Newest">Newest</option>
              <option value="LowToHigh">Price: Low to High</option>
              <option value="HighToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={isInWishlist}
                  addingToCart={addingToCart}
                  cartLoading={Boolean(cartLoading)}
                  wishlistLoading={wishlistLoading}
                  messages={messages}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-serif text-rose-900 font-bold">Explore the Aura of Newness</h3>
        <p className="mt-2 text-rose-700">Limited drops. Refined designs. Be the first to wear them.</p>
        <a href="/shop_all" className="mt-6 inline-block bg-white text-rose-700 px-6 py-3 rounded-lg font-semibold border border-rose-900 hover:bg-amber-50 transition">Shop Full Collection</a>
      </section>
    </div>
  );
};

export default NewProductsPage;