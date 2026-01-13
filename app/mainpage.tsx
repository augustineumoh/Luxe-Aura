import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronRight, FaChevronLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import HeroCarousel from "./hro";
import { Link } from "react-router-dom"; // fixed
import "aos/dist/aos.css";
import { useCart } from "./cartContext";
import { useWishlist } from "./wishlistContext";

// images (keep as-is if filenames include spaces)
import chanel from "./chanel.jpg";
import chanel2 from "./chanel2.jpg";
import chance from "./chance1.jpg";
import chance2 from "./chance2.jpg";
import jewel1 from "./jewel2.jpg";
import jewel2 from "./jewel 1.jpg";
import jewel3 from "./jewel3.jpg";
import jewel4 from "./jewel4.jpg";
import watch1 from "./watch1.jpg";
import watch2 from "./watch2.jpg";
import watch4 from "./watch4.jpg";
import watch3 from "./watch3.jpg";
import missdior from "./miss dior.jpg";
import missdior1 from "./miss dior1.jpg";
import necklace from "./necklace.jpg";
import necklace1 from "./necklace1.jpg";
import ring1 from "./rings1.jpg";
import ring from "./rings.jpg";
import earing from "./earing.jpg";
import earing1 from "./earing1.jpg";
import pefume from "./aura2.jpg";
import section1 from "./section1.jpg";
import section2 from "./section2.jpg";
import section3 from "./section6.jpg";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import gift1 from "./gift1.jpg";
import gift2 from "./gift2.jpg";
import gift3 from "./gift3.jpg";
import lag from "./lag1.jpg";
import paris from "./paris.jpg";
import tokyo from "./tokyo.jpg";

const products = [
  { id: 1, name: "Rose Gold Radiant Watch", price: "₦165,000.00", image: watch1, hoverImage: watch2 },
  { id: 2, name: "Bold-Set Gold Earrings", price: "₦93,000.00", image: earing, hoverImage: earing1 },
  { id: 3, name: "Chanel Chance Eau Tendre", price: "₦493,000.00", image: chance, hoverImage: chance2 },
  { id: 4, name: "Diamond Women Set", price: "₦865,000.00", image: jewel1, hoverImage: jewel2 },
  { id: 5, name: "Gold Braclet Set", price: "₦493,000.00", image: jewel3, hoverImage: jewel4 },
  { id: 6, name: "Coco Chanel Eau de parfum", price: "₦265,000.00", image: chanel, hoverImage: chanel2 },
  { id: 7, name: "Gold set necklace and rings", price: "₦193,000.00", image: necklace, hoverImage: necklace1 },
  { id: 8, name: "Wrist Watch and Bracelet Set", price: "₦293,000.00", image: watch4, hoverImage: watch3 },
  { id: 9, name: "Miss Dior Eau de parfum", price: "₦165,000.00", image: missdior, hoverImage: missdior1 },
  { id: 10, name: " Gold Ring set", price: "₦865,000.00", image: ring1, hoverImage: ring },
];

function ProductSlider(): JSX.Element {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("aos").then((AOS) => AOS.init({ duration: 1000 }));
    }
  }, []);

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
      // keep simple fallback; replace with toast if you use one
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
    <>
      <div className="mx-auto max-w-screen overflow-hidden">
        <HeroCarousel />

        <div className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0]" data-aos="fade-up">
          {/* Featured Products Section */}
          <section className="py-12 md:py-16 px-4 md:px-8 lg:px-20 relative" data-aos="fade-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-rose-900">Featured Products</h2>
                <p className="text-rose-700 text-sm md:text-base mt-1">Handpicked pieces that define luxury</p>
              </div>
              <Link to="/shop_all">
                <button type="button" className="group border-2 border-rose-900 font-bold uppercase text-rose-900 px-6 py-3 rounded-full hover:bg-rose-900 hover:text-[#FFFFF0] transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg">
                  Shop All
                  <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-2 md:left-3 transform -translate-y-1/2 z-10 cursor-pointer custom-prev">
              <button type="button" className="bg-white text-rose-900 p-2 md:p-3 text-2xl md:text-3xl rounded-full hover:bg-rose-900 hover:text-white transition-all shadow-lg hover:shadow-xl">
                <FaChevronLeft />
              </button>
            </div>

            <div className="absolute top-1/2 right-2 md:right-3 transform -translate-y-1/2 z-10 cursor-pointer custom-next">
              <button type="button" className="bg-white text-rose-900 p-2 md:p-3 text-2xl md:text-3xl rounded-full hover:bg-rose-900 hover:text-white transition-all shadow-lg hover:shadow-xl">
                <FaChevronRight />
              </button>
            </div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              spaceBetween={15}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    {...product}
                    isWishlisted={isInWishlist(product.id)}
                    wishlistLoading={wishlistLoading}
                    onToggleWishlist={toggleWishlist}
                    handleAddToCart={handleAddToCart}
                    addingToCart={addingToCart}
                    cartLoading={Boolean(cartLoading)}
                    messages={messages}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* The rest of sections unchanged... */}
          {/* The Aura Experience */}
          <section className="pb-10 px-4 md:px-8 lg:px-20 text-deepplum" data-aos="fade-up">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative group">
                <img
                  src={pefume}
                  alt="Elegant perfume bottle on silk"
                  className="rounded-3xl shadow-2xl object-cover w-full h-[300px] md:h-[500px] lg:h-[600px] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-rose-900/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900">The Aura Experience</h2>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  At <span className="italic font-semibold text-rose-900">Luxe Aura</span>, elegance is more than appearance—it's a ritual. From the first spritz of fragrance to the final shimmer of jewelry, every detail is designed to awaken your aura and leave a lasting impression.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">
                  Our collections are crafted with intention, blending timeless design with modern femininity. Whether you're stepping into a boardroom or a ballroom, Luxe Aura is your signature of grace.
                </p>

                <blockquote className="italic text-rose-900 text-lg md:text-xl border-l-4 border-rose-900 pl-4 py-2">"Elegance isn't worn—it's felt."</blockquote>

                <Link to="/shop_all">
                  <button type="button" className="group mt-4 border-2 border-rose-900 text-rose-900 px-8 py-4 uppercase tracking-wide rounded-full hover:bg-rose-900 hover:text-[#FFFFF0] font-bold transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2">
                    Explore the Collection
                    <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Find Your Aura */}
          <section className="pb-16 px-4 md:px-8 lg:px-20 text-deepplum relative" data-aos="fade-up">
            <div className="text-center mb-8 pt-10 relative z-10" data-aos="fade-right">
              <div className="inline-block bg-rose-200/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg mb-6 animate-bounce-slow">
                <p className="text-base md:text-xl italic text-rose-900">"Your aura is your signature—choose how it speaks."</p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-rose-900">Find Your Aura</h2>
              <p className="text-base md:text-lg text-rose-900 italic">Shop by mood, not just by category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <MoodCard title="Romantic" description="Soft florals, rose gold accents, and scents that linger like love notes." image={section1} link="/perfume#mood-filter" />
              <MoodCard title="Bold" description="Deep plum tones, statement jewelry, and fragrances that command attention." image={section2} link="/perfume#mood-filter" />
              <MoodCard title="Serene" description="Ivory palettes, minimalist pieces, and fresh notes that calm the soul." image={section3} link="/perfume#mood-filter" />
            </div>
          </section>

          {/* The Luxe Journal */}
          <section className="bg-ivory pt-10 pb-16 px-4 md:px-8 lg:px-20 text-deepplum" data-aos="fade-up">
            <div className="text-center mb-12" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-rose-900">The Luxe Journal</h2>
              <p className="text-base md:text-lg text-rose-900 italic">Stories, rituals, and inspiration from the world of elegance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <JournalCard title="Layering Scents Like a Muse" image={image1} excerpt="Discover the art of combining fragrances to create a signature aura that lingers beautifully." link="/journal/layering-scents" />
              <JournalCard title="The Ritual of Elegance: Behind Our Bottles" image={image2} excerpt="Explore the craftsmanship and symbolism behind our iconic perfume designs." link="/journal/ritual-of-elegance" />
              <JournalCard title="Jewelry That Speaks Without Words" image={image3} excerpt="Uncover how minimalist pieces can express bold emotion and timeless grace." link="/journal/jewelry-language" />
            </div>

            <div className="text-center mt-10">
              <a href="/journal" className="inline-block text-rose-900 font-bold text-lg underline underline-offset-4 hover:text-rose-600 transition-colors">Read More Articles →</a>
            </div>
          </section>

          {/* Gifts */}
          <section className="pt-10 pb-16 px-4 md:px-8 lg:px-20 text-deepplum" data-aos="fade-up">
            <div className="text-center mb-12" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-rose-900">Gifts That Whisper Luxury</h2>
              <p className="text-base md:text-lg text-rose-900 italic max-w-2xl mx-auto">Whether it's a gesture of love or a treat to self, our curated sets are wrapped in elegance and intention.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <GiftCard title="Rose Gold Radiance Set" image={gift1} price="₦865,000" link="/gifts/rose-gold-set" />
              <GiftCard title="Velvet Bloom Collection" image={gift2} price="₦493,000" link="/gifts/velvet-bloom" />
              <GiftCard title="Ivory Whisper Bundle" image={gift3} price="₦865,000" link="/gifts/ivory-whisper" />
            </div>

            <div className="text-center mt-10">
              <a href="/build-your-aura" className="inline-block bg-rose-900 text-white px-8 py-4 rounded-full text-lg font-bold tracking-wide hover:bg-rose-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">Build Your Aura</a>
            </div>
          </section>

          {/* Worn Around the World */}
          <section className="bg-ivory pb-16 px-4 md:px-8 lg:px-20 text-deepplum" data-aos="fade-up">
            <div className="text-center mb-12" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 text-rose-900">Worn Around the World</h2>
              <p className="text-base md:text-lg italic max-w-2xl mx-auto text-rose-900">From Lagos to Paris, Luxe Aura is a whisper of elegance across continents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <CityCard city="Lagos" image={lag} quote="The scent stays with me all day. I feel like royalty." customer="Amaka" product="Velvet Bloom Collection" link="/gifts/velvet-bloom" />
              <CityCard city="Paris" image={paris} quote="The packaging alone made me gasp. Luxe Aura is a dream." customer="Camille" product="Ivory Whisper Bundle" link="/gifts/ivory-whisper" />
              <CityCard city="Tokyo" image={tokyo} quote="Minimalist, elegant, unforgettable. My daily ritual." customer="Yuki" product="Rose Gold Radiance Set" link="/gifts/rose-gold-set" />
            </div>
          </section>

          {/* Testimonials */}
          <section className="pb-16 px-4 md:px-8 lg:px-20" data-aos="fade-up">
            <div className="text-center mb-10" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-rose-900 font-serif font-bold mb-3">What Our Muses Say</h2>
              <p className="text-base md:text-lg text-rose-900 italic">Real voices. Real elegance.</p>
            </div>

            <Swiper spaceBetween={30} slidesPerView={1} loop modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} className="max-w-3xl mx-auto">
              <SwiperSlide>
                <TestimonialCard quote="The scent stays with me all day. I feel like royalty." name="Ademide" city="Lagos" />
              </SwiperSlide>
              <SwiperSlide>
                <TestimonialCard quote="The packaging alone made me gasp. Luxe Aura is a dream." name="Camille" city="Paris" />
              </SwiperSlide>
              <SwiperSlide>
                <TestimonialCard quote="Minimalist, elegant, unforgettable. My daily ritual." name="Yuki" city="Tokyo" />
              </SwiperSlide>
            </Swiper>
          </section>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
      `}</style>
    </>
  );
}

/* ---------------------------
   Child components & types
   --------------------------- */

type ProductProps = {
  id: number;
  name: string;
  price: string;
  image: string;
  hoverImage: string;
  isWishlisted: boolean;
  wishlistLoading: number | null;
  onToggleWishlist: (id: number, e?: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddToCart: (id: number) => void;
  addingToCart: number | null;
  cartLoading: boolean;
  messages: { [key: number]: string };
};

function ProductCard({
  id,
  name,
  price,
  image,
  hoverImage,
  isWishlisted,
  wishlistLoading,
  onToggleWishlist,
  handleAddToCart,
  addingToCart,
  cartLoading,
  messages,
}: ProductProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group bg-white p-4 rounded-2xl transition-all hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 duration-300 relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        onClick={(e) => onToggleWishlist(id, e)}
        disabled={wishlistLoading === id}
        aria-label="Toggle wishlist"
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-rose-50 transition z-10 disabled:opacity-50"
      >
        {wishlistLoading === id ? (
          <div className="animate-spin h-6 w-6 border-2 border-rose-600 border-t-transparent rounded-full" />
        ) : isWishlisted ? (
          <IoHeart className="text-rose-600" size={24} />
        ) : (
          <IoHeartOutline className="text-gray-400" size={24} />
        )}
      </button>

      <div
        className="w-full h-64 md:h-72 lg:h-80 bg-cover bg-center mb-4 rounded-xl transition-all duration-500"
        style={{ backgroundImage: `url(${hovered ? hoverImage : image})` }}
      />

      <div className="space-y-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">{name}</h3>
        <p className="text-rose-900 font-bold text-xl md:text-2xl">{price}</p>

        {messages[id] && <p className={`text-sm ${messages[id].includes("✓") ? "text-green-600" : "text-red-600"}`}>{messages[id]}</p>}

        <button
          type="button"
          onClick={() => handleAddToCart(id)}
          disabled={addingToCart === id || cartLoading}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${addingToCart === id ? "bg-rose-400 text-white cursor-wait" : "bg-rose-600 text-white hover:bg-rose-700"} disabled:opacity-50`}
        >
          {addingToCart === id ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

type MoodProp = { title: string; description: string; image: string; link: string };
function MoodCard({ title, description, image, link }: MoodProp) {
  return (
    <a href={link} className="group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-6 bg-rose-100 group-hover:bg-rose-200 transition-colors">
        <h3 className="text-2xl md:text-3xl text-rose-900 font-semibold mb-3">{title}</h3>
        <p className="text-rose-800 text-sm md:text-base mb-4">{description}</p>
        <span className="inline-flex items-center gap-2 text-rose-900 font-bold group-hover:gap-3 transition-all">Explore {title} <FaLongArrowAltRight /></span>
      </div>
    </a>
  );
}

type JournalProp = { title: string; image: string; excerpt: string; link: string };
function JournalCard({ title, image, excerpt, link }: JournalProp) {
  return (
    <a href={link} className="group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 bg-rose-100 group-hover:bg-rose-200 transition-colors">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-rose-900">{title}</h3>
        <p className="text-sm md:text-base mb-4 text-rose-800">{excerpt}</p>
        <span className="inline-flex items-center gap-2 text-rose-900 font-bold group-hover:gap-3 transition-all">Read article <FaLongArrowAltRight /></span>
      </div>
    </a>
  );
}

type GiftProp = { title: string; image: string; price: string; link: string };
function GiftCard({ title, image, price, link }: GiftProp) {
  return (
    <a href={link} className="group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-rose-100 hover:border-rose-300 transform hover:-translate-y-2">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 bg-rose-100 group-hover:bg-rose-200 transition-colors">
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-rose-900">{title}</h3>
        <p className="text-sm md:text-base mb-4 text-rose-800">Starting at {price}</p>
        <span className="inline-flex items-center gap-2 text-rose-900 font-bold group-hover:gap-3 transition-all">View Set <FaLongArrowAltRight /></span>
      </div>
    </a>
  );
}

type CityProp = { city: string; image: string; quote: string; customer: string; product: string; link: string };
function CityCard({ city, image, quote, customer, product, link }: CityProp) {
  return (
    <a href={link} className="group block rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-rose-100 hover:border-rose-300 transform hover:-translate-y-2">
      <div className="relative h-64 md:h-72 overflow-hidden">
        <img src={image} alt={city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6 bg-rose-100 group-hover:bg-rose-200 transition-colors">
        <h3 className="text-xl md:text-2xl font-semibold mb-3 text-rose-900">{city}</h3>
        <blockquote className="italic text-sm md:text-base mb-2 text-rose-800">"{quote}"</blockquote>
        <p className="text-sm md:text-base text-rose-800 mb-4">– {customer}</p>
        <span className="inline-flex items-center gap-2 text-rose-900 font-bold group-hover:gap-3 transition-all">View {product} <FaLongArrowAltRight /></span>
      </div>
    </a>
  );
}

type TestimonialProp = { quote: string; name: string; city: string };
function TestimonialCard({ quote, name, city }: TestimonialProp) {
  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl text-center border-2 border-rose-100">
      <div className="flex justify-center mb-6 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" /></svg>
        ))}
      </div>
      <blockquote className="italic text-lg md:text-xl text-rose-900 mb-6">"{quote}"</blockquote>
      <p className="text-base md:text-lg text-rose-900 font-serif font-semibold">– {name}, {city}</p>
    </div>
  );
}

export default ProductSlider;