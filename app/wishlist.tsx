// app/wishlist.tsx
import { useWishlist } from './wishlistContext';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from './api/axios';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoHeartOutline, IoHeart, IoTrashOutline, IoBagAddOutline } from 'react-icons/io5';
import { useCart } from './cartContext';
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


// Sample product data
const fallbackProducts = [
  {
      id: 1,
      name: "Miss Dior Rose N'Roses",
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
      name: "Lalique L'Amour",
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
      name: "Aerin Ikat Jasmine",
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
      name: "Maison Francis",
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
         category: "Jewelry",
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
const fallbackProductMap = Object.fromEntries(
  fallbackProducts.map(p => [p.id, p.image])
);

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { removeFromWishlist: removeFromWishlistContext, refreshWishlist } = useWishlist(); // ✅ Use context
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/wishlist/');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: number, productId: number) => {
    try {
      await removeFromWishlistContext(productId); // ✅ Use context method
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId: number, wishlistItemId: number) => {
    try {
      setAddingToCart(productId);
      await addToCart(productId, 1);
      await removeFromWishlist(wishlistItemId, productId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-900 mx-auto mb-4"></div>
          <p className="text-rose-900 text-lg font-semibold">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <IoHeartOutline className="text-rose-300 text-8xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-rose-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your wishlist!
          </p>
          <Link
            to="/shop_all"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition font-semibold"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <IoHeart className="text-rose-600 text-4xl" />
          <h1 className="text-4xl font-bold text-rose-900">My Wishlist</h1>
          <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {wishlistItems.length}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition group relative overflow-hidden"
            >
              <button
    onClick={() => removeFromWishlist(item.id, item.product.id)}
    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition"
  >
    <IoTrashOutline className="text-red-500" size={20} />
  </button>

              {/* Product Image */}
              <Link to={`/product/${item.product.id}`}>
                <div className="h-64 overflow-hidden bg-rose-50">
             <img
  src={fallbackProductMap[item.product.id] ?? item.product.image}
  alt={item.product.name}
  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
/>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <span className="inline-block bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                  {item.product.category}
                </span>
                
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-rose-600 transition">
                    {item.product.name}
                  </h3>
                </Link>

                <div className="flex items-center text-rose-700 font-bold text-xl mb-4">
                  <TbCurrencyNaira size={24} />
                  <span>{Number(item.product.price).toLocaleString()}</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item.product.id, item.id)}
                  disabled={addingToCart === item.product.id || item.product.stock === 0}
                  className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    item.product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : addingToCart === item.product.id
                      ? 'bg-rose-400 text-white'
                      : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
                >
                  {item.product.stock === 0 ? (
                    'Out of Stock'
                  ) : addingToCart === item.product.id ? (
                    'Adding...'
                  ) : (
                    <>
                      <IoBagAddOutline size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;