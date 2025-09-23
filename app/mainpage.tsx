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
import AOS from "aos";
import "aos/dist/aos.css";

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
   useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration (in ms)
        once: true,     // whether animation should happen only once
      });
    }, []);
    
  return (
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
   <div className="absolute top-158 left-1/2 transform -translate-x-1/2 z-10">
    <div className="backdrop-blur-md bg-rose-200 px-6 py-4 rounded-lg animate-bounce text-xl italic text-center text-rose-900 max-w-lg shadow-md">
      “Your aura is your signature—choose how it speaks.”
    </div>
  </div>


  <div className="text-center mb-12" data-aos="fade-right">
    <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">Find Your Aura</h2>
    <p className="text-lg text-rose-900 italic">Shop by mood, not just by category</p>
  </div>
   
  <div className="grid md:grid-cols-3 gap-8">
    {/* Mood Card 1: Romantic */}
    <MoodCard
      title="Romantic"
      description="Soft florals, rose gold accents, and scents that linger like love notes."
      image={section1}
      link="/collections/romantic"
    />

    {/* Mood Card 2: Bold */}
    <MoodCard
      title="Bold"
      description="Deep plum tones, statement jewelry, and fragrances that command attention."
      image={section2}
      link="/collections/bold"
    />

    {/* Mood Card 3: Serene */}
    <MoodCard
      title="Serene"
      description="Ivory palettes, minimalist pieces, and fresh notes that calm the soul."
      image={section3}
      link="/collections/serene"
    />
  </div>
</section>

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


export default ProductSlider;