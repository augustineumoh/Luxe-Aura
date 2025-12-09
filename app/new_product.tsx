import React, { useMemo, useState } from "react";
import ruby from "./Ruby Radiance Ring.jpg"
import oud from "./new product1.jpg"
import emrald from "./Emerald Muse Earrings.jpg"
import jasmine from "./Jasmine Veil Eau de Parfum.jpg"
import img from "./new product_hero.jpg"
import { TbCurrencyNaira } from "react-icons/tb";
import oud1 from "./Oud Noir Parfum.jpg"
import palazzo from "./Palazzo Nobile Blooming Ballet.jpg"
import diamond from "./Diamond Whisper Bracelet.jpg"
import halo from "./Golden Halo Necklace.jpg"
import pearl from "./Pearl Grace Studs.jpg"

/* -------------------------------
   Types
-------------------------------- */
type Category = "Perfume" | "Jewelry";

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string; // public path e.g. /images/new/ruby-ring.jpg
  isNew: boolean;
  isLimited?: boolean;
  description?: string;
  launchDate?: string; // ISO date for sorting by “Newest”
}

/* -------------------------------
   Sample data (replace with API)
-------------------------------- */
const products: Product[] = [
  {
    id: "p-001",
    name: "Ruby Radiance Ring",
    category: "Jewelry",
    price: 62000,
    image: ruby,
    isNew: true,
    isLimited: true,
    description: "A hand-cut ruby set in gold, designed to captivate with its fiery elegance and bold charm.",
    launchDate: "2025-11-23",
  },
  {
    id: "p-002",
    name: "Verset parfum - Sofia",
    category: "Perfume",
    price: 140000,
    image: oud,
    isNew: true,
    description: "Blackcurrant and May rose meet amber and musk in this charismatic, modern fragrance for confident women.",
    launchDate: "2025-11-28",
  },
  {
    id: "p-003",
    name: "Emerald Muse Earrings",
    category: "Jewelry",
    price: 28000,
    image: emrald,
    isNew: true,
    description: "Vivid emerald stones in a sleek silhouette — a statement of refined luxury and individuality.",
    launchDate: "2025-11-12",
  },
  {
    id: "p-008",
    name: "Diamond Whisper Bracelet",
    category: "Jewelry",
    price: 58000,
    image: diamond,
    isNew: true,
    description: "Delicate diamonds on a gold chain, whispering elegance with every movement.",
    launchDate: "2025-11-29",
  },
  {
    id: "p-009",
    name: "Golden Halo Necklace",
    category: "Jewelry",
    price: 60000,
    image: halo,
    isNew: true,
    description: "A minimalist gold pendant that glows with warmth — perfect for layering or solo styling.",
    launchDate: "2025-11-27",
  },
  {
    id: "p-010",
    name: "Pearl Grace Studs",
    category: "Jewelry",
    price: 63000,
    image: pearl,
    isNew: true,
    description: "Classic freshwater pearls in a modern setting — timeless beauty for everyday sophistication.",
    launchDate: "2025-11-25",
  },
  {
    id: "p-004",
    name: "Jasmine Veil Eau de Parfum",
    category: "Perfume",
    price: 55000,
    image: jasmine,
    isNew: true,
    description: "Airy jasmine layered with soft vanilla.",
    launchDate: "2025-11-10",
  },
  {
    id: "p-005",
    name: "Oud Noir Parfum",
    category: "Perfume",
    price: 50000,
    image: oud1,
    isNew: true,
    description: "A bold blend of smoky oud and warm amber, crafted for evening sophistication and allure",
    launchDate: "2025-11-20",
  },
  {
    id: "p-006",
    name: "Palazzo Nobile Blooming Ballet",
    category: "Perfume",
    price: 52000,
    image: palazzo,
    isNew: true,
    description: "A romantic floral bouquet with notes of peony and rose, evoking elegance and femininity.",
    launchDate: "2025-11-12",
  },
  {
    id: "p-007",
    name: "Chanel Chance Eau Tendre",
    category: "Perfume",
    price: 42000,
    image: palazzo,
    isNew: true,
    description: "A luminous floral-fruity fragrance blending grapefruit and quince with jasmine and white musk.",
    launchDate: "2025-11-22",
  },
];

/* -------------------------------
   Component
-------------------------------- */
const NewProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"All" | Category>("All");
  const [sortOption, setSortOption] = useState<"Newest" | "LowToHigh" | "HighToLow">("Newest");

  // Featured product (newest by launchDate)
  const featuredProduct = useMemo<Product | undefined>(() => {
    return [...products]
      .filter((p) => p.isNew)
      .sort((a, b) => {
        const ad = a.launchDate ? Date.parse(a.launchDate) : 0;
        const bd = b.launchDate ? Date.parse(b.launchDate) : 0;
        return bd - ad; // newest first
      })[0];
  }, []);

  // Filter + search + sort
  const visibleProducts = useMemo<Product[]>(() => {
    const term = (searchTerm ?? "").toLowerCase();
    let list = products.filter((p) => p.isNew);

    if (categoryFilter !== "All") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    if (term) {
      list = list.filter((p) => (p.name ?? "").toLowerCase().includes(term));
    }

    if (sortOption === "Newest") {
      list = [...list].sort((a, b) => {
        const ad = a.launchDate ? Date.parse(a.launchDate) : 0;
        const bd = b.launchDate ? Date.parse(b.launchDate) : 0;
        return bd - ad;
      });
    } else if (sortOption === "LowToHigh") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === "HighToLow") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchTerm, categoryFilter, sortOption]);

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
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              {featuredProduct.isLimited && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Limited Edition
                </span>
              )}
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-rose-900 font-bold">
                {featuredProduct.name}
              </h2>
              <p className="mt-3 text-rose-800">{featuredProduct.description}</p>
              <p className="mt-4 text-sm text-rose-900">{featuredProduct.category}</p>
              <p className="mt-2 text-rose-700 text-2xl font-bold flex items-center"><TbCurrencyNaira  className="mr-1" />{featuredProduct.price}</p>
              <div className="mt-6 flex gap-3">
                <button className="border text-rose-900 text-1xl uppercase font-medium border-rose-900 px-4 py-2 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition">
                  Add to Cart
                </button>
                <button className="ml-4 text-rose-900 border text-1xl uppercase font-medium border-rose-900 px-4 py-2 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="w-24 h-1 bg-gradient-to-r from-rose-500 via-rose-200 to-rose-500 mx-auto"></div>

      {/* Controls */}
      <section id="new-arrivals" className="py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
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
              onChange={(e) =>
                setSortOption(e.target.value as "Newest" | "LowToHigh" | "HighToLow")
              }
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
                <article
                  key={p.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl h-[480px] flex flex-col transition transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative">
                    {p.isLimited && (
                      <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-3 py-1 rounded-full shadow">
                        Limited
                      </span>
                    )}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow text-center">
                    <h3 className="text-lg font-semibold text-rose-900">{p.name}</h3>
                    <p className="text-gray-600">{p.category}</p>
                    <p className="text-rose-700 font-bold mt-2 flex justify-center items-center"><TbCurrencyNaira  className="mr-1" />{p.price}</p>
                    <button className="mt-4 w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products found.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <h3 className="text-2xl md:text-3xl font-serif text-rose-900 font-bold">
          Explore the Aura of Newness
        </h3>
        <p className="mt-2 text-rose-700">Limited drops. Refined designs. Be the first to wear them.</p>
        <a
          href="/shop"
          className="mt-6 inline-block bg-white text-rose-700 px-6 py-3 rounded-lg font-semibold border border-rose-900 hover:bg-amber-50 transition"
        >
          Shop Full Collection
        </a>
      </section>
    </div>
  );
};

export default NewProductsPage;