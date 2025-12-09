import React from "react";
import img from "./hero fragrance story.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import backgroundimage from "./comment.jpg";
import "swiper/css";
import "swiper/css/pagination";
import fragrance from "./our fragrance story.jpg"
import { Link } from "react-router";



const testimonials = [
  {
    name: "— Sophia M.",
    role: "Food Blogger",
    rating: 5,
    text: "Luxe Aura fragrances feel like poetry in a bottle. I’ve never felt more confident.",
  },
  {
    name: "Amina Yusuf",
    role: "Nutritionist",
    rating: 5,
    text: "Luxe Aura fragrances feel so pure and refreshing. I love how the scents uplift my mood after a long day."
  },
  {
    name: "David Okoro",
    role: "Entrepreneur",
    rating: 5,
    text: "Every fragrance tells a story. I wear Luxe Aura to meetings and it always leaves a lasting impression."
  },
  {
    name: "Sophia Martins",
    role: "Fashion Blogger",
    rating: 4,
    text: "The blend of jasmine and vanilla is heavenly. It’s subtle yet elegant — perfect for my daily style."
  },
  {
    name: "— Daniel K.",
    role: "Software Developer",
    rating: 4,
    text: "“Every scent tells my story. Luxe Aura is more than perfume, it’s an experience.",
  },
  {
    name: "Chinedu Eze",
    role: "Photographer",
    rating: 5,
    text: "I’m amazed at how unique each scent feels. Luxe Aura perfumes are like capturing emotions in a bottle."
  },
  {
    name: "Fatima Bello",
    role: "Interior Designer",
    rating: 5,
    text: "The fragrances are calming and luxurious. I especially love how they linger softly without being overpowering."
  },
  {
    name: "Michael Johnson",
    role: "Musician",
    rating: 4,
    text: "Luxe Aura perfumes inspire creativity. The bold notes give me confidence before stepping on stage."
  },
];

const FragranceStory = () => {
  return (
    <div className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] text-gray-800" data-aos="fade-up">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[100vh] flex items-center justify-center"
      style={{backgroundImage: `url(${img})`}}>
        <div className="absolute inset-0 bg-black/3 backdrop-blur-sm z-0"></div>
        <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
    <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
      <h1 className="text-4xl font-bold mb-4">Our Fragrance Story</h1>
      <p className="text-lg mb-8 font-bold">Every scent tells a story — discover the journey of Luxe Aura.</p>
      <Link to="/shop_all"><button className="border border-rose-900 font-bold text-rose-900 px-6 py-3 rounded-2xl uppercase tracking-wide hover:bg-rose-900 hover:text-[#FFFFF0] transition" data-aos="">
        Shop All
      </button></Link>
      <Link to="/perfume"><button className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition" data-aos="">Perfume</button>
    </Link>
    </div>
  </div>
      </section>
      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] from- py-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
         <h2 className="text-4xl font-serif font-bold mb-6 text-rose-900 flex justify-center items-center">Our Fragrance Story</h2>
         <div className="w-80 h-1 bg-gradient-to-r from-[#FFFFF0] via-rose-400 to-[#FFFFF0] mx-auto mb-8"></div>
  <div className="grid md:grid-cols-2 gap-12 items-center pt-6">
    {/* Image */}
    <div>
      <img
        src={fragrance}
        alt="Minimalist gold jewelry on silk"
        className="rounded-lg shadow-lg object-cover w-full h-140"
      />
    </div>

    {/* Text */}
    <div>
      
       <p className="text-lg md:text-xl text-rose-800 leading-relaxed"data-aos="fade-up">
          At <span className="italic text-rose-900 font-bold">Luxe Aura</span>, every
          fragrance is more than a scent — it is a journey. Inspired by timeless
          elegance and the art of self-expression, our perfumes are crafted to
          capture emotions, memories, and moments.
        </p>

        <p className="text-lg md:text-xl text-rose-800 leading-relaxed"data-aos="fade-up">
          From bold notes that ignite passion to soft whispers that soothe the
          soul, each creation is designed to resonate with your individuality.
          We believe fragrance is not just worn, it is lived — a signature that
          lingers in the air long after you’ve left the room.
        </p>
                <p className="text-lg md:text-xl text-rose-800 leading-relaxed"data-aos="fade-up">
          Our story is one of artistry, authenticity, and allure. With carefully
          curated blends and exquisite craftsmanship,{" "}
          <span className="italic text-rose-900 font-bold">Luxe Aura</span> invites you
          to discover scents that speak to your spirit and jewelry that shines
          with your essence.
        </p>

    </div>
  </div>
</section>

      {/* Ingredient Spotlight */}
      <section className=" py-10 px-6" data-aos="fade-up">
        <h2 className="text-3xl font-serif text-center mb-12 text-rose-900 font-bold">
          Signature Ingredients
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" data-aos="slide-right">
          <div className="bg-rose-200 flex flex-col justify-center items-center shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow  cursor-pointer ">
            <h3 className="text-xl font-semibold mb-2 text-rose-900">Oud</h3>
            <p className="text-gray-600">
              Deep, earthy, and luxurious — the heart of many Luxe Aura blends.
            </p>
          </div>
          <div className="bg-rose-200 flex flex-col justify-center items-center shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow  cursor-pointer ">
            <h3 className="text-xl font-semibold mb-2 text-rose-900">Jasmine</h3>
            <p className="text-gray-600">
              Floral and serene, symbolizing purity and timeless beauty.
            </p>
          </div>
          <div className="bg-rose-200 shadow-md flex flex-col justify-center items-center p-6 rounded-lg hover:shadow-lg transition-shadow  cursor-pointer ">
            <h3 className="text-xl font-semibold mb-2 text-rose-900  ">Vanilla</h3>
            <p className="text-gray-600">
              Warm and comforting, adding softness to bold compositions.
            </p>
          </div>
        </div>
      </section>

      <div
      className="relative bg-cover bg-center bg-no-repeat py-20 px-6 sm:px-12 lg:px-20"
       data-aos="fade-up"
  data-aos-delay="200"
  data-aos-duration="1200"

      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-900">What Our Clients Have to Say</h2>
          <p className="text-lg mt-2 text-rose-900">Real stories from real customers</p>
        </div>

       <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={30}
  slidesPerView={1}
  loop={true}
  autoplay={{
    delay: 5000,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
  className="w-full max-w-xl mx-auto"
>
  {testimonials.map((t, index) => (
    <SwiperSlide key={index}>
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg text-rose-800">
        <p className="text-xl font-bold text-rose-800">{t.name}</p>
        <p className="text-sm text-rose-800">{t.role}</p>
        <div className="text-rose-600 text-lg my-2">
          {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
        </div>
        <p className="text-rose-800">{t.text}</p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </div>
    </div>
  );
};

export default FragranceStory;