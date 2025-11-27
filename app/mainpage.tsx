import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import chanel from "./chanel.jpg"
import chanel2 from "./chanel2.jpg"
import chance from "./chance1.jpg"
import chance2 from "./chance2.jpg"
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import jewel1 from "./jewel2.jpg"
import jewel2 from "./jewel 1.jpg"
import jewel3 from "./jewel3.jpg"
import jewel4 from "./jewel4.jpg"
import watch1 from "./watch1.jpg"
import watch2 from "./watch2.jpg"
import watch4 from "./watch4.jpg"
import watch3 from "./watch3.jpg"
import missdior from "./miss dior.jpg"
import missdior1 from "./miss dior1.jpg"
import necklace from "./necklace.jpg"
import necklace1 from "./necklace1.jpg"
import ring1 from "./rings1.jpg"
import ring from "./rings.jpg"
import earing from "./earing.jpg"
import earing1 from "./earing1.jpg"
import pefume from "./aura2.jpg"
import section1 from "./section1.jpg"
import section2 from "./section2.jpg"
import section3 from "./section6.jpg"
// import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import gift1 from "./gift1.jpg"
import gift2 from "./gift2.jpg"
import gift3 from "./gift3.jpg"
import lag from "./lag1.jpg"
import paris from "./paris.jpg"
import tokyo from "./tokyo.jpg"
import { Autoplay } from 'swiper/modules';
import HeroCarousel from './hro';


const products = [
  {
    name: "Kith for Wilson Pro Padel Racket",
    price: "₦865,000.00",
    image: watch1,
    hoverImage: watch2,
  },
  {
    name: "Kith for Wilson Elite Padel Racket",
    price: "₦493,000.00",
    image: earing,
    hoverImage: earing1,
  },
  {
    name: "Kith for Wilson Elite Padel Racket",
    price: "₦493,000.00",
    image: chance,
    hoverImage: chance2,
  },
  {
    name: "Kith for Wilson Pro Padel Racket",
    price: "₦865,000.00",
    image: jewel1,
    hoverImage: jewel2,
  },
  {
    name: "Kith for Wilson Elite Padel Racket",
    price: "₦493,000.00",
    image: jewel3,
    hoverImage: jewel4,
  },
  {
    name: "Kith for Wilson Pro Padel Racket",
    price: "₦865,000.00",
    image: chanel,
    hoverImage: chanel2,
  },
  {
    name: "Kith for Wilson Elite Padel Racket",
    price: "₦493,000.00",
    image: necklace,
    hoverImage: necklace1,
  },
  {
    name: "Kith for Wilson Elite Padel Racket",
    price: "₦493,000.00",
    image: watch4,
    hoverImage: watch3,
  },
  {
    name: "Kith for Wilson Pro Padel Racket",
    price: "₦865,000.00",
    image: missdior,
    hoverImage: missdior1,
  },
  {
    name: "Kith for Wilson Pro Padel Racket",
    price: "₦865,000.00",
    image: ring1,
    hoverImage: ring,
  },
];


function ProductSlider() {
  //  useEffect(() => {
  //     AOS.init({
  //       duration: 1000, // animation duration (in ms)
  //       once: true,     // whether animation should happen only once
  //     });
  //   }, []);
     // ✅ AOS animation effect
    useEffect(() => {
      if (typeof window !== 'undefined') {
        import('aos').then((AOS) => AOS.init({ duration: 1000 }));
        import('aos/dist/aos.css');
      }
    }, []);
  return (
    <div>

    
    <HeroCarousel/>
    <div className='bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] ' data-aos="fade-up">

    
    <section className="py-16 px-20 relative " data-aos="fade-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-rose-900 uppercase">Featured Products</h2>
        <button className="border border-rose-900 font-bold text-rose-900 px-4 py-2 uppercase rounded-2xl hover:bg-rose-900 hover:text-[#FFFFF0] transition">
          Shop All
        </button>
      </div>

 <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 cursor-pointer custom-prev">
  <button className="bg-[#FFFFF0] text-rose-900 p-2 text-3xl rounded-full hover:bg-rose-900 hover:text-[#FFFFF0]">
    <FaChevronLeft />
  </button>
</div>

<div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 cursor-pointer custom-next">
  <button className="bg-[#FFFFF0] text-rose-900 text-3xl p-2 rounded-full hover:bg-rose-900 hover:text-[#FFFFF0]">
    <FaChevronRight />
  </button>
</div>

      <Swiper
        modules={[Navigation]}
         navigation={{
      prevEl: '.custom-prev',
      nextEl: '.custom-next',
    }}
        spaceBetween={15}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          869: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
    
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    <section className="pb-10 px-20 md:px-20 text-deepplum" data-aos="fade-up">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Left: Image */}
    <div className="relative">
      <img
        src={pefume}
        alt="Elegant perfume bottle on silk"
        className="rounded-3xl shadow-lg object-cover w-full h-150"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-rosegold opacity-10 rounded-lg"></div>
    </div>

    {/* Right: Text */}
    <div>
      <h2 className="text-4xl font-bold mb-6 text-rose-900">The Aura Experience</h2>
      <p className="text-lg leading-relaxed mb-6">
        At <span className="italic font-semibold text-rose-900">Luxe Aura</span>, elegance is more than appearance—it's a ritual. From the first spritz of fragrance to the final shimmer of jewelry, every detail is designed to awaken your aura and leave a lasting impression.
      </p>
      <p className="text-lg leading-relaxed mb-8">
        Our collections are crafted with intention, blending timeless design with modern femininity. Whether you're stepping into a boardroom or a ballroom, Luxe Aura is your signature of grace.
      </p>
       {/* Quote */}
      <blockquote className="italic text-rose-900 text-xl mb-8 border-l-4 border-rose-900 pl-4">
        “Elegance isn’t worn—it’s felt.”
      </blockquote>

      <button className="hover:bg-rose-900 text-rose-900 border  border-rose-900 px-6 py-3 uppercase tracking-wide rounded-2xl hover:bg-rosegold hover:text-[#FFFFF0] font-bold transition">
        Explore the Collection
      </button>
    </div>
  </div>
</section>
  
  <section className=" pb-35 px-6 md:px-20 text-deepplum relative" data-aos="fade-up">
   <div className="absolute top-175 left-1/2 transform -translate-x-1/2 z-10">
    <div className="backdrop-blur-md bg-rose-200 px-6 py-4 rounded-lg animate-bounce text-xl italic text-center text-rose-900 max-w-lg shadow-md">
      “Your aura is your signature—choose how it speaks.”
    </div>
  </div>


  <div className="text-center mb-12 pt-10" data-aos="fade-right">
    <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">Find Your Aura</h2>
    <p className="text-lg text-rose-900 italic">Shop by mood, not just by category</p>
  </div>
   
  <div className="grid md:grid-cols-3 gap-8">
    {/* Mood Card 1: Romantic */}
    <MoodCard
      title="Romantic"
      description="Soft florals, rose gold accents, and scents that linger like love notes."
      image={section1}
      link="/perfume#mood-filter"
    />

    {/* Mood Card 2: Bold */}
    <MoodCard
      title="Bold"
      description="Deep plum tones, statement jewelry, and fragrances that command attention."
      image={section2}
      link="/perfume#mood-filter"
    />

    {/* Mood Card 3: Serene */}
    <MoodCard
      title="Serene"
      description="Ivory palettes, minimalist pieces, and fresh notes that calm the soul."
      image={section3}
      link="/perfume#mood-filter"
    />
  </div>
</section>

<section className="bg-ivory pt-15 pb-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
  {/* Section Title */}
  <div className="text-center mb-16" data-aos="fade-right">
    <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">The Luxe Journal</h2>
    <p className="text-lg text-rose-900 italic">Stories, rituals, and inspiration from the world of elegance</p>
  </div>

  {/* Blog Cards */}
  <div className="grid md:grid-cols-3 gap-10">
    <JournalCard
      title="Layering Scents Like a Muse"
      image={image1}
      excerpt="Discover the art of combining fragrances to create a signature aura that lingers beautifully."
      link="/journal/layering-scents"
    />
    <JournalCard
      title="The Ritual of Elegance: Behind Our Bottles"
      image={image2}
      excerpt="Explore the craftsmanship and symbolism behind our iconic perfume designs."
      link="/journal/ritual-of-elegance"
    />
    <JournalCard
      title="Jewelry That Speaks Without Words"
      image={image3}
      excerpt="Uncover how minimalist pieces can express bold emotion and timeless grace."
      link="/journal/jewelry-language"
    />
  </div>

  {/* Read More Button */}
  <div className="text-center mt-12">
    <a
      href="/journal"
      className="text-rose-900 font-bold text-lg underline underline-offset-4 hover:text-rose-600 transition"
    >
      Read More
    </a>
  </div>
</section>

<section className=" pt-5 pb-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
  {/* Section Title */}
  <div className="text-center mb-16" data-aos="fade-right">
    <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">Gifts That Whisper Luxury</h2>
    <p className="text-lg text-rose-900 italic max-w-2xl mx-auto">
      Whether it’s a gesture of love or a treat to self, our curated sets are wrapped in elegance and intention.
    </p>
  </div>

  {/* Product Cards */}
  <div className="grid md:grid-cols-3 gap-10">
    <GiftCard
      title="Rose Gold Radiance Set"
      image={gift1}
      price="₦865,000"
      link="/gifts/rose-gold-set"
    />
    <GiftCard
      title="Velvet Bloom Collection"
      image={gift2}
      price="₦493,000"
      link="/gifts/velvet-bloom"
    />
    <GiftCard
      title="Ivory Whisper Bundle"
      image={gift3}
      price="₦865,000"
      link="/gifts/ivory-whisper"
    />
  </div>

  {/* Build Your Aura Button */}
  <div className="text-center mt-12">
    <a
      href="/build-your-aura"
      className="inline-block bg-rose-900 text-white px-8 py-3 rounded-full text-lg font-bold tracking-wide hover:bg-rose-500 transition"
    >
      Build Your Aura
    </a>
  </div>
</section>

<section className="bg-ivory pb-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
  {/* Section Title */}
  <div className="text-center mb-16" data-aos="fade-right">
    <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">Worn Around the World</h2>
    <p className="text-lg text-rosegold italic max-w-2xl mx-auto text-rose-900">
      From Lagos to Paris, Luxe Aura is a whisper of elegance across continents.
    </p>
  </div>

  {/* City Cards */}
  <div className="grid md:grid-cols-3 gap-10">
    <CityCard
      city="Lagos"
      image={lag}
      quote="The scent stays with me all day. I feel like royalty."
      customer="Amaka"
      product="Velvet Bloom Collection"
      link="/gifts/velvet-bloom"
    />
    <CityCard
      city="Paris"
      image={paris}
      quote="The packaging alone made me gasp. Luxe Aura is a dream."
      customer="Camille"
      product="Ivory Whisper Bundle"
      link="/gifts/ivory-whisper"
    />
    <CityCard
      city="Tokyo"
      image={tokyo}
      quote="Minimalist, elegant, unforgettable. My daily ritual."
      customer="Yuki"
      product="Rose Gold Radiance Set"
      link="/gifts/rose-gold-set"
    />
  </div>
</section>

<section className=" pb-20 px-6 md:px-20 "data-aos="fade-up">
  {/* Section Title */}
  <div className="text-center mb-12" data-aos="fade-right">
    <h2 className="text-4xl text-rose-900 font-serif font-bold mb-4">What Our Muses Say</h2>
    <p className="text-lg text-rose-900 italic">Real voices. Real elegance.</p>
  </div>

  {/* Swiper Carousel */}
  <Swiper
    spaceBetween={30}
    slidesPerView={1}
    loop={true}
    modules={[Autoplay]}
    autoplay={{ delay: 3000 }}
    className="max-w-3xl mx-auto"
  >
    <SwiperSlide>
      <TestimonialCard
        quote="The scent stays with me all day. I feel like royalty."
        name="Ademide"
        city="Lagos"
      />
    </SwiperSlide>
    <SwiperSlide>
      <TestimonialCard
        quote="The packaging alone made me gasp. Luxe Aura is a dream."
        name="Camille"
        city="Paris"
      />
    </SwiperSlide>
    {/* Add more slides as needed */}
  </Swiper>
  </section>

    </div>
  </div>
  );
}
type productprops={
    name:string,
    price:string,
    image:string,
    hoverImage:string
}

function ProductCard({ name, price, image, hoverImage }:productprops) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className=" p-4 transition-shadow hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-60 h-70 bg-cover bg-center mb-4"
        style={{ backgroundImage: `url(${hovered ? hoverImage : image})` }}
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 mt-2">{price}</p>

    </div>

  );
}
type moodprop={
    title:string,
    description:string,
    image:string,
    link:string

}


function MoodCard({ title, description, image, link }:moodprop) {
  return (
    <a href={link} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <div
        className="h-85 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6 bg-ivory group-hover:bg-rosegold transition-colors">
        <h3 className="text-2xl text-[#B76E79] font-semibold mb-2 group-hover:text-rose-900">{title}</h3>
        <p className="text-[#B76E79] text-sm group-hover:text-rose-900">{description}</p>
      </div>
    </a>
  );
}

type journalprop={
  title: string,
  image: string,
  excerpt: string,
  link: string
}
function JournalCard({ title, image, excerpt, link }:journalprop) {
  return (
    <a href={link} className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
      <img src={image} alt={title} className="h-[300px] w-full object-cover" />
      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors">
        <h3 className="text-xl font-semibold mb-2 text-rose-900 group-hover:text-rose-700">{title}</h3>
        <p className="text-sm mb-4 text-rose-900 group-hover:text-rose-700">{excerpt}</p>
        <span className="text-rose-900 group-hover:text-rose-700 font-medium group flex items-center gap-2">
          Read article <FaLongArrowAltRight />
        </span>
      </div>
    </a>
  );
}

type giftprop={
  title:string,
  image:string,
  price:string,
  link:string
}
function GiftCard({ title, image, price, link }:giftprop) {
  return (
    <a href={link} className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition border border-rose-100 group">
      <img src={image} alt={title} className="h-[300px] w-full object-cover"/>
      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors">
        <h3 className="text-xl font-semibold mb-2 text-rose-900 group-hover:text-rose-700">{title}</h3>
        <p className="text-sm mb-4 group-hover:text-rose-700 text-rose-900">Starting at {price}</p>
        <span className="text-rose-900 group-hover:text-rose-700 font-medium  flex items-center gap-2">
          View Set <FaLongArrowAltRight />
        </span>
      </div>
    </a>
  );
}

type cityprop={
  city:string,
  image:string,
  quote:string,
  customer:string,
  product:string,
  link:string
}

function CityCard({ city, image, quote, customer, product, link }:cityprop) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group border border-rose-100">
      <img src={image} alt={city} className="h-[300px] w-full object-cover" />
      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-rose-700 text-rose-900">{city}</h3>
        <blockquote className="italic text-sm mb-2 group-hover:text-rose-700 text-rose-900">“{quote}”</blockquote>
        <p className="text-sm text-deepplum group-hover:text-rose-700 text-rose-900 mb-4">– {customer}</p>
        <a
          href={link}
          className="text-rose-900 group-hover:text-rose-700  font-medium flex items-center gap-2"
        >
          View {product} <FaLongArrowAltRight />
        </a>
      </div>
    </div>
  );
}

type testimonialprop={
  quote:string,
  name:string,
  city:string
}

function TestimonialCard({ quote, name, city }:testimonialprop) {
  return (
    <div className="bg-[#fffff0] p-8 rounded-lg shadow-md text-center animate-fade-in">
      {/* Rose Gold Stars */}
      <div className="flex justify-center mb-4 text-rose-300">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-rosegold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="italic text-lg text-rose-900 mb-4">“{quote}”</blockquote>
      <p className="text-sm text-rose-900 font-serif">– {name}, {city}</p>
    </div>
  );
}
export default ProductSlider;