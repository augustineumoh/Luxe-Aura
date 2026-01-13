import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // fixed import
import "aos/dist/aos.css";
import AOS from "aos";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useCart } from "./cartContext";
import { useWishlist } from "./wishlistContext";

/* images (kept as-is — if filenames contain spaces you may want to rename them on disk) */
import heroImg from "./jewery_hero.jpg";
import jewel1 from "./jewel1.jpg";
import whisperChain from "./Whisper Chain Necklace.jpg";
import museHoops from "./Muse Gold Hoops.jpg";
import statementring from "./Ivory Statement Ring.jpg";
import auraWatch from "./Aura Gold Watch.jpg";
import silkBracelet from "./Silk Wrap Bracelet.jpg";
import RingImg from "./ring 1.jpg";
import weddingRing from "./wedding ring.jpg";
import engagementRing from "./engagement Ring.jpg";
import squarering from "./squared gold ring.jpg";
import sapphirering from "./sapphire wedding band.jpg";
import rubyring from "./Ruby ring.jpg";
import goldring from "./gold piece.jpg";
import stackring from "./stackring.jpg";
import knotnecklace from "./knot necklace.jpg";
import layerednecklace from "./layered choker.jpg";
import chainnecklace from "./thick chain necklace.jpg";
import gold_plated from "./gold_plated necklace.jpg";
import heartdecor from "./heart decor.jpg";
import silvernecklace from "./silver necklace.jpg";
import pearl from "./pearl necklace.jpg";
import layeredpearl from "./silver layered.jpg";
import butterflybracelet from "./butterfly bracelets.jpg";
import setbracelet from "./2set bracelets.jpg";
import goldset from "./gold set bracelet.jpg";
import silverbracelet from "./personalized bracelet.jpg";
import vintage from "./vintage braclet.jpg";
import pearlbracelet from "./pearl bracelets.jpg";
import diamond from "./diamond bracelets.jpg";
import diamondgold from "./diamond gold bracelet.jpg";
import quartzwatch from "./quartz watch.jpg";
import goldwatch from "./goldchain watch.jpg";
import bronzewatch from "./stainless steel.jpg";
import squarewatch from "./square watch.jpg";
import fossilwatch from "./fossil watch.jpg";
import rhinewatch from "./rhinestone watch.jpg";
import darkwatch from "./blackchain watch.jpg";
import radowatch from "./blackleather watch.jpg";
import tripleearing from "./Triple Knot earing.jpg";
import pearlearing from "./pearl earings.jpg";
import emeraldearing from "./emerald earring.jpg";
import studearing from "./stud earing.jpg";
import diamondstud from "./diamondstud earing.jpg";
import diamondpearl from "./wedding earring.jpg";
import hoopearing from "./hoop earing.jpg";
import thickhoopearing from "./thick hoop earing.jpg";

type JewelryItem = {
  id: number;
  title: string;
  image: string;
  price: string;
  link: string;
  type: string;
};

export default function JewelryPage(): JSX.Element {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [selectedType, setSelectedType] = useState<string>("All");

  const jewelryItems: JewelryItem[] = [
    { id: 1, title: "Whisper Chain Necklace", image: whisperChain, price: "₦265,000", link: "/jewelry/whisper-chain", type: "Necklace" },
    { id: 2, title: "Muse Gold Hoops", image: museHoops, price: "₦185,000", link: "/jewelry/muse-hoops", type: "Earrings" },
    { id: 3, title: "Squared-shaped Gold Ring", image: squarering, price: "₦215,000", link: "/jewelry/ivory-ring", type: "Ring" },
    { id: 6, title: "Ivory Statement Ring", image: RingImg, price: "₦215,000", link: "/jewelry/ivory-ring", type: "Ring" },
    { id: 4, title: "Aura Gold Watch", image: auraWatch, price: "₦495,000", link: "/jewelry/aura-watch", type: "Watch" },
    { id: 5, title: "Silk Wrap Bracelet", image: silkBracelet, price: "₦175,000", link: "/jewelry/silk-bracelet", type: "Bracelet" },
    { id: 7, title: "Golden Wedding Rings", image: weddingRing, price: "₦175,000", link: "/jewelry/wedding-ring", type: "Ring" },
    { id: 8, title: "Engagement Ring", image: engagementRing, price: "₦175,000", link: "/jewelry/engagement-ring", type: "Ring" },
    { id: 9, title: "Statement Ring", image: statementring, price: "₦175,000", link: "/jewelry/statement-ring", type: "Ring" },
    { id: 10, title: "White and Blue sapphire Wedding Ring", image: sapphirering, price: "₦175,000", link: "/jewelry/sapphire-ring", type: "Ring" },
    { id: 11, title: "Ring with Ruby and Aquamarine Accents", image: rubyring, price: "₦175,000", link: "/jewelry/ruby-ring", type: "Ring" },
    { id: 12, title: "Gold ring", image: goldring, price: "₦175,000", link: "/jewelry/gold-ring", type: "Ring" },
    { id: 13, title: "Perfect Stack ring", image: stackring, price: "₦175,000", link: "/jewelry/stack-ring", type: "Ring" },
    { id: 14, title: "Infinity Knot Necklace in 18K Gold Plated", image: knotnecklace, price: "₦265,000", link: "/jewelry/knot-necklace", type: "Necklace" },
    { id: 15, title: "Layered Chain Choker Necklace", image: layerednecklace, price: "₦265,000", link: "/jewelry/layered-choker", type: "Necklace" },
    { id: 16, title: "Heart Pendant OT Buckle Necklace", image: chainnecklace, price: "₦265,000", link: "/jewelry/heart-pendant", type: "Necklace" },
    { id: 17, title: "Gold-Plated Stainless Steel", image: gold_plated, price: "₦265,000", link: "/jewelry/gold-plated", type: "Necklace" },
    { id: 18, title: "Heart Decor Necklace", image: heartdecor, price: "₦265,000", link: "/jewelry/heart-decor", type: "Necklace" },
    { id: 19, title: "Single Pearl Solitaire Necklace Choker", image: silvernecklace, price: "₦265,000", link: "/jewelry/pearl-choker", type: "Necklace" },
    { id: 20, title: "Pearl Necklace", image: pearl, price: "₦265,000", link: "/jewelry/pearl-necklace", type: "Necklace" },
    { id: 21, title: "Silver Pearl Layered Necklace", image: layeredpearl, price: "₦265,000", link: "/jewelry/layered-pearl", type: "Necklace" },
    { id: 22, title: "Butterfly pearl Bracelet", image: butterflybracelet, price: "₦175,000", link: "/jewelry/butterfly-bracelet", type: "Bracelet" },
    { id: 23, title: "Nordstrom Set of 2 Mesh Stretch Bracelets", image: setbracelet, price: "₦175,000", link: "/jewelry/set-bracelet", type: "Bracelet" },
    { id: 24, title: "Perfect Gold Set of Bracelets", image: goldset, price: "₦175,000", link: "/jewelry/goldset-bracelet", type: "Bracelet" },
    { id: 25, title: "Sterling Silver Personalized Bridesmaid Bracelet", image: silverbracelet, price: "₦175,000", link: "/jewelry/personalized-bracelet", type: "Bracelet" },
    { id: 26, title: "French Vintage Pearl Bracelet", image: vintage, price: "₦175,000", link: "/jewelry/vintage-bracelet", type: "Bracelet" },
    { id: 27, title: "Triple Tier Pearl Bracelet", image: pearlbracelet, price: "₦175,000", link: "/jewelry/pearl-bracelet", type: "Bracelet" },
    { id: 28, title: "Diamond Bracelet", image: diamond, price: "₦175,000", link: "/jewelry/diamond-bracelet", type: "Bracelet" },
    { id: 29, title: "Diamond Gold Bracelet", image: diamondgold, price: "₦175,000", link: "/jewelry/diamond-gold-bracelet", type: "Bracelet" },
    { id: 30, title: "Round Pointer Quartz Watch", image: quartzwatch, price: "₦495,000", link: "/jewelry/quartz-watch", type: "Watch" },
    { id: 31, title: "Gold chain watch", image: goldwatch, price: "₦495,000", link: "/jewelry/gold-watch", type: "Watch" },
    { id: 32, title: "Meibo Quartz Analog Stainless Steel Wristwatch.", image: bronzewatch, price: "₦495,000", link: "/jewelry/meibo-watch", type: "Watch" },
    { id: 33, title: "Squared Leather Watch", image: squarewatch, price: "₦495,000", link: "/jewelry/squared-watch", type: "Watch" },
    { id: 34, title: "Fossil Gold Watch", image: fossilwatch, price: "₦495,000", link: "/jewelry/fossil-watch", type: "Watch" },
    { id: 35, title: "Rhinestone Decor Round Pointer Date Quartz Watch", image: rhinewatch, price: "₦495,000", link: "/jewelry/rhine-watch", type: "Watch" },
    { id: 36, title: "Minimalist stainless steel dress watch", image: darkwatch, price: "₦495,000", link: "/jewelry/dark-watch", type: "Watch" },
    { id: 37, title: "Modern Rado Watch for Young Men", image: radowatch, price: "₦495,000", link: "/jewelry/rado-watch", type: "Watch" },
    { id: 38, title: "Triple Knot Earrings - Gold", image: tripleearing, price: "₦495,000", link: "/jewelry/triple-knot-earrings", type: "Earrings" },
    { id: 39, title: "Pearl Dropping Earing", image: pearlearing, price: "₦495,000", link: "/jewelry/pearl-earrings", type: "Earrings" },
    { id: 40, title: "Emerald Dropping Earing", image: emeraldearing, price: "₦495,000", link: "/jewelry/emerald-earrings", type: "Earrings" },
    { id: 41, title: "Floret Blue Sapphire Round & Diamond Stud Earrings", image: studearing, price: "₦495,000", link: "/jewelry/floret-studs", type: "Earrings" },
    { id: 42, title: "Diamond Halo Stud Earrings", image: diamondstud, price: "₦495,000", link: "/jewelry/diamond-studs", type: "Earrings" },
    { id: 43, title: "Diamond Pearl Dropping Earring", image: diamondpearl, price: "₦495,000", link: "/jewelry/diamond-pearl-earrings", type: "Earrings" },
    { id: 44, title: "Gold Hoop Earring", image: hoopearing, price: "₦495,000", link: "/jewelry/gold-hoops", type: "Earrings" },
    { id: 45, title: "Thick Gold Hoop Earring", image: thickhoopearing, price: "₦495,000", link: "/jewelry/thick-hoops", type: "Earrings" },
  ];

  const filteredJewelry = jewelryItems.filter((item) => (selectedType === "All" ? true : item.type === selectedType));

  // Cart & wishlist state + handlers
  const { addToCart, loading: cartLoading } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ [key: number]: string }>({});

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [wishlistLoading, setWishlistLoading] = useState<number | null>(null);

  const toggleWishlist = async (productId: number, event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    try {
      setWishlistLoading(productId);
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (err: any) {
      console.error("Wishlist error:", err);
      const message = err?.response?.data?.error || err?.message || "Failed to update wishlist. Please login.";
      // simple fallback; replace with toast in your app if available
      alert(message);
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
    <div>
      {/* Hero Section */}
      <section
        className="relative text-[#fffff0] py-32 px-6 md:px-20 bg-cover bg-no-repeat h-148"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
          <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
            <h1 className="text-3xl font-bold mb-4">Jewelry That Speaks Without Words</h1>
            <p className="text-lg mb-8 font-bold">Minimalist forms. Maximal emotion. Crafted to whisper elegance.</p>
            <Link to="/shop_all">
              <button type="button" className="border border-rose-900 font-bold text-rose-900 px-6 py-3 rounded-2xl uppercase tracking-wide hover:bg-rose-900 hover:text-[#FFFFF0] transition">
                Shop All
              </button>
            </Link>
            <Link to="/jewelry_story">
              <button type="button" className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition">
                Read the Story
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
        <blockquote className="italic text-rose-900 text-xl flex my-4 justify-center items-center-safe border-l-4 border-rose-900 pl-4">
          “Elegance isn’t worn—it’s felt.”
        </blockquote>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={jewel1} alt="Minimalist gold jewelry on silk" className="rounded-lg shadow-lg object-cover w-full h-full" />
          </div>

          <div>
            <h2 className="text-4xl font-serif font-bold mb-6 text-rose-900">The Language of Jewelry</h2>
            <p className="text-lg leading-relaxed mb-6 text-rose-900">
              At <span className="italic font-semibold">Luxe Aura</span>, jewelry is more than adornment—it’s a silent conversation. Each piece is designed to express emotion, mood, and presence without saying a word.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-rose-900">
              From delicate chains to bold silhouettes, our collections are crafted to whisper elegance and amplify your aura.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum">
        {/* Filter Bar */}
        <div className="flex justify-center space-x-4 mb-12">
          {["All", "Ring", "Necklace", "Bracelet", "Watch", "Earrings"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full border ${selectedType === type ? "bg-rose-900 text-[#fffff0]" : "border-rose-900 text-rose-900"} hover:bg-rosegold hover:text-rose-400 transition`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-16 text-rose-900">
          <h2 className="text-4xl font-serif font-bold mb-4">Our Signature Pieces</h2>
          <p className="text-lg text-rosegold italic">Curated by type, crafted to elevate your aura</p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredJewelry.map((item) => (
            <JewelryCard
              key={item.id}
              item={item}
              wishlistLoading={wishlistLoading}
              isWishlisted={isInWishlist(item.id)}
              onToggleWishlist={toggleWishlist}
              handleAddToCart={handleAddToCart}
              addingToCart={addingToCart}
              cartLoading={Boolean(cartLoading)}
              messages={messages}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* JewelryCard component */
type JewelryCardProps = {
  item: JewelryItem;
  wishlistLoading: number | null;
  isWishlisted: boolean;
  onToggleWishlist: (id: number, e?: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddToCart: (id: number) => void;
  addingToCart: number | null;
  cartLoading: boolean;
  messages: { [key: number]: string };
};

function JewelryCard({
  item,
  wishlistLoading,
  isWishlisted,
  onToggleWishlist,
  handleAddToCart,
  addingToCart,
  cartLoading,
  messages,
}: JewelryCardProps) {
  return (
    <a href={item.link} className="relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group border border-rose-100" data-aos="fade-up" onClick={(e) => { /* keep link behavior */ }}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault(); // prevent anchor navigation when clicking wishlist button
          onToggleWishlist(item.id, e);
        }}
        disabled={wishlistLoading === item.id}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-rose-50 transition z-10 disabled:opacity-50"
        aria-label="Add to wishlist"
      >
        {wishlistLoading === item.id ? (
          <div className="animate-spin h-6 w-6 border-2 border-rose-600 border-t-transparent rounded-full" />
        ) : isWishlisted ? (
          <IoHeart className="text-rose-600" size={24} />
        ) : (
          <IoHeartOutline className="text-gray-400" size={24} />
        )}
      </button>

      <img src={item.image} alt={item.title} className="h-[350px] w-full object-cover" />

      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors text-rose-800">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-rose-900">{item.title}</h3>
        <p className="text-sm mb-4 group-hover:text-rose-900">{item.price}</p>

        <div className="flex justify-between items-center">
          <span className="text-rosegold group-hover:text-rose-900 font-medium flex items-center gap-3 rounded-2xl border p-2 transition border-rose-900">
            View Details <FaLongArrowAltRight />
          </span>

          <div className="w-40">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // avoid anchor navigation when adding to cart
                handleAddToCart(item.id);
              }}
              disabled={addingToCart === item.id || cartLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${addingToCart === item.id ? "bg-rose-400 text-white cursor-wait" : "bg-rose-600 text-white hover:bg-rose-700"} disabled:opacity-50`}
            >
              {addingToCart === item.id ? "Adding..." : "Add to Cart"}
            </button>

            {messages[item.id] && (
              <p className={`text-sm mt-2 text-center font-medium ${messages[item.id].includes("Failed") || messages[item.id].toLowerCase().includes("error") ? "text-red-600" : "text-green-600"}`}>
                {messages[item.id]}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}