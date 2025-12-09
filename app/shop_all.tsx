import React, { useState } from "react";
import img from "./shopping-page.jpg"
import chan from "./chanel romantic.jpg"
import lamour from "./lamour romantic.jpg"
import jacob from "./jacob romantic.jpg"
import dior from "./dior romanic.jpg"
import narciso from "./narciso romantic.jpg"
import ysl from "./ysl romantic.jpg"
import viktor from "./viktor.jpg"
import tom from "./tom romantic.jpg"
import jo from "./blush romantic.jpg"
import maison from "./replica bold.jpg"
import opium from "./opium bold.jpg"
import interlude from "./interlude.jpg"
import dior_b from "./dior bold.jpg"
import oud from "./oud.jpg"
import sha from "./sha bold.jpg"
import mill from "./millon.jpg"
import luten from "./luten bold.jpg"
import irish from "./memo.jpg"
import { TbCurrencyNaira } from "react-icons/tb";
// import { FaLongArrowAltRight } from "react-icons/fa";
import eau from "./chanel soft.jpg"
import glossier from "./Glossier soft.jpg"
import amazing from "./amazing soft.jpg"
import clean from "./clean.jpg"
import daisy from "./daisy.jpg"
import jasmine from "./jasmine.jpg"
import burberry from "./burberry.jpg"
import maisonf from "./maison.jpg"
import musk from "./musk.jpg"
import lazy from "./lazy.jpg"
import blanche from "./blanche.jpg"
import heretic from "./musk serene.jpg"
import malin from "./malin.jpg"
import xtra from "./xtra.jpg"
import cashmere from "./korres.jpg"
import chloe from "./chloe serene.jpg"
import missing from "./phlur.jpg"
import maisonfrancis from "./maison Francis.jpg"
// import jewel1 from "./jewel1.jpg"
// import { FaLongArrowAltRight } from "react-icons/fa";
import whisperChain from "./Whisper Chain Necklace.jpg"
import museHoops from "./Muse Gold Hoops.jpg"
import statementring from "./Ivory Statement Ring.jpg"
import auraWatch from "./Aura Gold Watch.jpg"
import silkBracelet from "./Silk Wrap Bracelet.jpg"
import Ring from "./ring 1.jpg"
import weddingRing from "./wedding ring.jpg"
import engagementRing from "./engagement Ring.jpg"
import squarering from "./squared gold ring.jpg"
import sapphirering from "./sapphire wedding band.jpg"
import rubyring from "./Ruby ring.jpg"
import goldring from "./gold piece.jpg"
import stackring from "./stackring.jpg"
import knotnecklace from "./knot necklace.jpg"
import layerednecklace from "./layered choker.jpg"
import chainnecklace from "./thick chain necklace.jpg"
import gold_plated from "./gold_plated necklace.jpg"
import heartdecor from "./heart decor.jpg"
import silvernecklace from "./silver necklace.jpg"
import pearl from "./pearl necklace.jpg"
import layeredpearl from "./silver layered.jpg"
import butterflybracelet from "./butterfly bracelets.jpg"
import setbracelet from "./2set bracelets.jpg"
import goldset from "./gold set bracelet.jpg"
import silverbracelet from "./personalized bracelet.jpg"
import vintage from "./vintage braclet.jpg"
import pearlbracelet from "./pearl bracelets.jpg"
import diamond from "./diamond bracelets.jpg"
import diamondgold from "./diamond gold bracelet.jpg"
import quartzwatch from "./quartz watch.jpg"
import goldwatch from "./goldchain watch.jpg"
import bronzewatch from "./stainless steel.jpg"
import squarewatch from "./square watch.jpg"
import fossilwatch from "./fossil watch.jpg"
import rhinewatch from "./rhinestone watch.jpg"
import darkwatch from "./blackchain watch.jpg"
import radowatch from "./blackleather watch.jpg"
import tripleearing from "./Triple Knot earing.jpg"
import pearlearing from "./pearl earings.jpg"
import emeraldearing from "./emerald earring.jpg"
import studearing from "./stud earing.jpg"
import diamondstud from "./diamondstud earing.jpg"
import diamondpearl from "./wedding earring.jpg"
import hoopearing from "./hoop earing.jpg"
import thickhoopearing from "./thick hoop earing.jpg"
// import { Link } from "react-router";

// Sample product data
const products = [
  {
      id: 1,
      name: "Miss Dior Rose N’Roses",
      image: dior,
      price: 93000,
      category: "Perfume",
    },
    {
      id: 2,
      name: "Narciso Rodriguez for Her",
      image: narciso,
      price: 98000,
      category: "Perfume",
    },
    {
      id: 3,
      name: "Yves Saint Laurent Mon Paris",
      image: ysl,
      price: 70000,
      category: "Perfume",
    },
    {
      id: 4,
      name: "Viktor & Rolf Flowerbomb",
      image: viktor,
      price: 93000,
      category: "Perfume",
    },
    {
      id: 5,
      name: "Tom Ford Velvet Orchid",
      image: tom,
      price: 89000,
      category: "Perfume",
    },
    {
      id: 6,
      name: "Jo Malone Peony & Blush Suede",
      image: jo,
      price: 65000,
      category: "Perfume",
    },
    {
      id: 7,
      name: "Chanel Coco Mademoiselle",
      image: chan,
      price: 52000,
      category: "Perfume",
    },
    {
      id: 8,
      name: "Lalique L’Amour",
      image: lamour,
      price: 99000,
      category: "Perfume",
    },
    {
      id: 9,
      name: "Marc Jacobs Perfect",
      image: jacob,
      price: 96000,
      category: "Perfume",
    },
    {
      id: 10,
      name: "Maison Margiela Replica By the Fireplace",
      image: maison,
      price: 200000,
      category: "Perfume",
    },
    {
      id: 11,
      name: "Yves Saint Laurent Opium",
      image: opium,
      price: 104000,
      category: "Perfume",
    },
    {
      id: 12,
      name: "Amouage Interlude Man",
      image: interlude,
      price: 79000,
      category: "Perfume",
    },
    {
      id: 13,
      name: "Dior Fahrenheit",
      image: dior_b,
      price: 86000,
      category: "Perfume",
    },
    {
      id: 14,
      name: "Le Labo Oud 27",
      image: oud,
      price: 46000,
      category: "Perfume",
    },
    {
      id: 15,
      name: "Guerlain Shalimar",
      image: sha,
      price: 65000,
     category: "Perfume",
    },
    {
      id: 16,
      name: "Paco Rabanne 1 Million",
      image: mill,
      price: 58000,
      category: "Perfume",
    },
    {
      id: 17,
      name: "Serge Lutens Chergui",
      image: luten,
      price: 37000,
      category: "Perfume",
    },
    {
      id: 18,
      name: "Memo Irish Leather",
      image: irish,
      price: 58000,
      category: "Perfume",
    },
    {
      id: 19,
      name: "Chanel Chance Eau Tendre",
      image: eau,
      price: 200000,
      category: "Perfume",
    },
    {
      id: 20,
      name: "Glossier You",
      image: glossier,
      price: 35000,
      category: "Perfume",
    },
    {
      id: 21,
      name: "Philosophy Amazing Grace",
      image: amazing,
      price: 63000,
      category: "Perfume",
    },
    {
      id: 22,
      name: "Clean Reserve Skin",
      image: clean,
      price: 100000,
      category: "Perfume",
    },
    {
      id: 23,
      name: "Marc Jacobs Daisy",
      image: daisy,
      price: 40000,
      category: "Perfume",
    },
    {
      id: 24,
      title: "Aerin Ikat Jasmine",
      image: jasmine,
      price: 65000,
      category: "Perfume",
    },
    {
      id: 25,
      name: "Burberry Her Eau de Toilette",
      image: burberry,
      price: 84000,
      category: "Perfume",
    },
    {
      id: 26,
      name: "Maison Francis Kurkdjian Aqua Universalis",
      image: maisonf,
      price: 30000,
      category: "Perfume",
    },
    {
      id: 27,
      name: "The Body Shop White Musk",
      image: musk,
      price: 48000,
      category: "Perfume",
    },
    {
      id: 28,
      name: "Maison Margiela Replica Lazy Sunday Morning",
      image: lazy,
      price: 61000,
      category: "Perfume",
    },
    {
      id: 29,
      name: "Byredo Blanche Eau de Parfum",
      image: blanche,
      price: 35000,
      category: "Perfume",
    },
    {
      id: 30,
      name: "Heretic Parfum Bergamusk EDP",
      image: heretic,
      price: 29000,
      category: "Perfume",
    },
    {
      id: 31,
      name: "Malin + Goetz Stem EDP",
      image: malin,
      price: 75000,
      category: "Perfume",
    },
    {
      id: 32,
      name: "Clean Reserve Warm Cotton",
      image: xtra,
      price: 95000,
      category: "Perfume",
    },
    {
      id: 33,
      name: "Korres Cashmere Kumquat Eau de Toilette",
      image: cashmere,
      price: 45000,
      category: "Perfume",
    },
    {
      id: 34,
      name: "Chloé Love Story Eau de Parfum",
      image: chloe,
      price: 85000,
      category: "Perfume",
    },
    {
      id: 35,
      name: "Phlur Missing Person",
      image: missing,
      price: 85000,
      category: "Perfume",
    },
    {
      id: 36,
      name: "Maison Francis Kurkdjian Aqua Universalis",
      image: maisonfrancis,
      price: 65000,
      category: "Perfume",   
	},
  
{
         id: 37,
         name: "Whisper Chain Necklace",
         image: whisperChain,
         price: 33000,
         category: "Jewelry",
       },
       {
         id: 38,
         name: "Muse Gold Hoops",
         image: museHoops,
         price: 85000,
         category: "Jewelry",
       },
       {
         id: 39,
         name: "Squared-shaped Gold Ring",
         image: squarering,
         price: 15000,
         category: "Jewelry",
       },
       {
         id: 40,
         name: "Ivory Statement Ring",
         image: Ring,
         price: 25000,
         link: "/jewelry/ivory-ring",
         type: "Ring",
       },
       {
         id: 41,
         name: "Aura Gold Watch",
         image: auraWatch,
         price: 95000,
        category: "Jewelry",
       },
       {
         id: 42,
         name: "Silk Wrap Bracelet",
         image: silkBracelet,
         price: 75000,
         category: "Jewelry",
       },
       {
         id: 43,
         name: "Golden Wedding Rings",
         image: weddingRing,
         price: 55000,
         category: "Jewelry",
       },
       {
         id: 44,
         name: "Engagement Ring",
         image: engagementRing,
         price: 75000,
         category: "Jewelry",
       },
       {
         id: 45,
         name: "Statement Ring",
         image: statementring,
         price: 25000,
         category: "Jewelry",
       },
       {
         id: 46,
         name: "White and Blue sapphire Wedding Ring",
         image: sapphirering,
         price: 175000,
         category: "Jewelry",
       },
       {
         id: 47,
         name: "Ring with Ruby and Aquamarine Accents",
         image: rubyring,
         price: 35000,
         category: "Jewelry",
       },
       {
         id: 48,
         name: "Gold ring",
         image: goldring,
         price: 15000,
         category: "Jewelry",
       },
       {
         id: 49,
         name: "Perfect Stack ring",
         image: stackring,
         price: 85000,
         category: "Jewelry",
       },
       {
       id: 50,
         name: "Infinity Knot Necklace in 18K Gold Plated",
         image: knotnecklace,
         price: 25000,
         category: "Jewelry",
       },
       {
       id: 51,
         name: "Layered Chain Choker Necklace",
         image: layerednecklace,
         price: 26000,
         category: "Jewelry",
       },
       {
       id: 52,
         name: "Heart Pendant OT Buckle Necklace",
         image: chainnecklace,
         price: 46000,
         category: "Jewelry",
       },
       {
       id: 53,
         name: "Gold-Plated Stainless Steel",
         image: gold_plated,
         price: 65000,
         category: "Jewelry",
       },
       {
       id: 54,
         name: "Heart Decor Necklace",
         image: heartdecor,
         price: 55000,
         category: "Jewelry",
       },
       {
       id: 55,
         name: "Pearl Necklace",
         image: pearl,
         price: 35000,
        category: "Jewelry",
       },
       {
       id: 56,
         name: "Single Pearl Solitaire Necklace Choker",
         image: silvernecklace,
         price: 53000,
         category: "Jewelry",
       },
       {
       id: 57,
         name: "Silver Pearl Layered Necklace",
         image: layeredpearl,
         price: 36000,
         category: "Jewelry",
       },
       {
         id: 58,
         name: "Butterfly pearl Bracelet",
         image: butterflybracelet,
         price: 15000,
         category: "Jewelry",
       },
       {
         id: 59,
         name: "Nordstrom Set of 2 Mesh Stretch Bracelets",
         image: setbracelet,
         price: 17000,
        category: "Jewelry",
       },
       {
         id: 60,
         name: "Perfect Gold Set of Bracelets",
         image: goldset,
         price: 25000,
         category: "Jewelry",
       },
       {
         id: 61,
         name: "Sterling Silver Personalized Bridesmaid Bracelet",
         image: silverbracelet,
         price: 45000,
         category: "Jewelry",
       },
       {
         id: 62,
         name: "French Vintage Pearl Bracelet",
         image: vintage,
         price: 26000,
         category: "Jewelry",
       },
       {
         id: 81,
         name: "Triple Tier Pearl Bracelet",
         image: pearlbracelet,
         price: 19000,
         category: "Jewelry",
       },
       {
         id: 63,
         name: "Diamond Bracelet",
         image: diamond,
         price: 75000,
         category: "Jewelry",
       },
       {
         id: 64,
         name: "Diamond Gold Bracelet",
         image: diamondgold,
         price: 95000,
         category: "Jewelry",
       },
       {
         id: 65,
         name: "Round Pointer Quartz Watch",
         image: quartzwatch,
         price: 45000,
         category: "Jewelry",
       },
       {
         id: 66,
         name: "Gold chain watch",
         image: goldwatch,
         price: 49000,
         category: "Jewelry",
       },
       {
         id: 67,
         name: "Meibo Quartz Analog Stainless Steel Wristwatch.",
         image: bronzewatch,
         price: 95000,
         category: "Jewelry",
       },
       {
         id: 68,
         name: "Squared Leather Watch",
         image: squarewatch,
         price: 85000,
         category: "Jewelry",
       },
       {
         id: 69,
         name: "Fossil Gold Watch",
         image: fossilwatch,
         price: 65000,
         category: "Jewelry",
       },
       {
         id: 70,
         name: "Rhinestone Decor Round Pointer Date Quartz Watch",
         image: rhinewatch,
         price: 250000,
         category: "Jewelry",
       },
       {
         id: 71,
         name: "Minimalist stainless steel dress watch ",
         image: darkwatch,
         price: 49000,
         category: "Jewelry",
       },
       {
         id: 72,
         name: "Modern Rado Watch for Young Men",
         image: radowatch,
         price: 44000,
         category: "Jewelry",
       },
       {
         id: 73,
         name: "Triple Knot Earrings - Gold",
         image: tripleearing,
         price: 35000,
         category: "Jewelry",
       },
       {
         id: 74,
         name: "Pearl Dropping Earing",
         image: pearlearing,
         price: 55000,
         category: "Jewelry",
       },
       {
         id: 75,
         name: "Emerald Dropping Earing",
         image: emeraldearing,
         price: 42000,
         category: "Jewelry",
       },
       {
         id: 76,
         name: "Floret Blue Sapphire Round & Diamond Stud Earrings in White Gold",
         image: studearing,
         price: 33000,
         category: "Jewelry",
       },
       {
         id: 77,
         name: "Diamond Halo Stud Earrings",
         image: diamondstud,
         price: 49000,
         category: "Jewelry",
       },
       {
         id: 78,
         name: "Diamond Pearl Dropping Earring",
         image: diamondpearl,
         price: 45000,
         category: "Jewelry",
       },
       {
         id: 79,
         name: "Gold Hoop Earring",
         image: hoopearing,
         price: 28000,
         category: "Jewelry",
       },
       {
         id: 80,
         name: "Thick Gold Hoop Earring",
         image: thickhoopearing,
         price: 67000,
         category: "Jewelry",
       },




];


const ShopAllPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("None");

  // Filter + search logic
  const filteredProducts = products.filter((product) => {
  const name = product.name || "";
  const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory =
    filterCategory === "All" || product.category === filterCategory;
  return matchesSearch && matchesCategory;
});


  // Sorting logic
  if (sortOption === "LowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "HighToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] min-h-screen">
        <section
  className="relative bg-cover bg-center h-[100vh] flex items-center justify-center"
  style={{ backgroundImage: `url(${img})` }} // place image in public/images
>
  {/* Overlay with shimmering gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-rose-300/30 to-black/40 animate-pulse"></div>

  {/* Content */}
 <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
    <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
      <h1 className="text-4xl font-bold mb-4">Discover Your Signature Aura</h1>
      <p className="text-lg mb-8 font-bold">Explore our curated collection of fragrances and jewelry — crafted to elevate your essence and express your individuality.
    </p>
      <button className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition" data-aos="">Shop All Collections</button>
    </div>
  </div>
</section>
      {/* Page Title */}
      <div className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-5xl font-serif text-rose-900 font-bold">
          Shop All
        </h1>
        <p className="text-lg text-rose-700 mt-2">
          Discover our full collection of perfumes and jewelry
        </p>
      </div>

      {/* Search + Filter + Sort Controls */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 placeholder:text-rose-200 border border-rose-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-900"
        />

        {/* Filter Dropdown */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border text-rose-900 border-rose-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-900"
        >
          <option value="All" className="text-rose-900">All Categories</option>
          <option value="Perfume">Perfume</option>
          <option value="Jewelry">Jewelry</option>
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border text-rose-900 border-rose-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-900"
        >
          <option value="None">Sort by</option>
          <option value="LowToHigh">Price: Low to High</option>
          <option value="HighToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
  key={product.id}
  className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer h-[470px] flex flex-col"
>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-64 object-cover rounded-t-lg"
  />

  <div className="flex flex-col justify-between flex-grow p-4 text-center">
    <div>
      <h3 className="text-lg font-semibold text-rose-900 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-rose-700 font-bold mt-2 flex justify-center items-center">
        <TbCurrencyNaira className="mr-1" />
        {product.price}
      </p>
    </div>

    <button className=" w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition">
      Add to Cart
    </button>
  </div>
</div>
          ))
        ) : (
          <p className="text-center text-rose-900 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopAllPage;