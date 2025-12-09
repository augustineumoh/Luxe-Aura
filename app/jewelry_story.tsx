import React from "react";
import img from "./our_jewellry.jpg"; // Hero background image
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import backgroundimage from "./our_jewellry.jpg"; // Background for testimonial section
import "swiper/css";
import "swiper/css/pagination";
import jewelryImage from "./jewelry_story.jpg"; // Image for story section
import JewelryGalleryCarousel from "./jewelry_carousel";
import { Link } from "react-router";

const testimonials = [
  {
    name: "Chioma Adewale",
    role: "Event Planner",
    rating: 5,
    text: "The Luxe Aura necklace I wore at my wedding was breathtaking. It added elegance and sparkle to my special day.",
  },
  {
    name: "James Okafor",
    role: "Corporate Executive",
    rating: 4,
    text: "I bought a cufflink set from Luxe Aura. It’s subtle yet powerful — perfect for boardroom confidence.",
  },
  {
    name: "Lara Bello",
    role: "Artist",
    rating: 5,
    text: "Each piece feels like wearable art. The craftsmanship is exquisite and truly reflects individuality.",
  },
  {
    name: "Tunde Alabi",
    role: "Architect",
    rating: 5,
    text: "The bracelet I purchased is minimal yet luxurious. It’s become my everyday signature accessory.",
  },
  {
    name: "Fatima Hassan",
    role: "Fashion Stylist",
    rating: 5,
    text: "I love how Luxe Aura jewelry complements their fragrances. Together, they create a complete aura of style.",
  },
  {
    name: "Michael Peters",
    role: "Photographer",
    rating: 4,
    text: "The rings are timeless. They look stunning in portraits and add sophistication to every shot.",
  },
];

const JewelryStory = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] text-gray-800"
      data-aos="fade-up"
    >
      {/* Hero Section */}
<section
  className="relative bg-cover bg-center h-[100vh] flex items-center justify-center"
  style={{ backgroundImage: `url(${img})` }} // place image in public/images
>
  {/* Overlay with shimmering gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-rose-300/30 to-black/40 animate-pulse"></div>

  {/* Content */}
  <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
    <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
      <h1 className="text-4xl font-bold mb-4">Our Jewelry Story</h1>
      <p className="text-lg mb-8 font-bold">Adorn your aura with timeless elegance — crafted to shine, designed to inspire.</p>
      <Link to="/shop_all"><button className="border border-rose-900 font-bold text-rose-900 px-6 py-3 rounded-2xl uppercase tracking-wide hover:bg-rose-900 hover:text-[#FFFFF0] transition" data-aos="">
        Shop All
      </button></Link>
      <Link to="/jewery"><button className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition" data-aos="">Explore Jewelry</button>
    </Link>
    </div>
  </div>
</section>

<JewelryGalleryCarousel/>

      {/* Story Section */}
      <section
        className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-serif font-bold mb-6 text-rose-900 flex justify-center items-center">
          Our Jewelry Story
        </h2>
        <div className="w-80 h-1 bg-gradient-to-r from-[#FFFFF0] via-rose-400 to-[#FFFFF0] mx-auto mb-8"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center pt-6">
          {/* Image */}
          <div>
            <img
              src={jewelryImage}
              alt="Elegant Luxe Aura jewelry"
              className="rounded-lg shadow-lg object-cover w-full h-140"
            />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-lg md:text-xl text-rose-800 leading-relaxed"
              data-aos="fade-up"
            >
              At <span className="italic text-rose-900 font-bold">Luxe Aura</span>, jewelry is more than adornment — it is a statement. Inspired by timeless artistry and individuality, our pieces are crafted to celebrate elegance and self-expression.
            </p>

            <p
              className="text-lg md:text-xl text-rose-800 leading-relaxed"
              data-aos="fade-up"
            >
              From delicate rings to bold necklaces, each creation is designed to resonate with your aura. We believe jewelry is not just worn, it is lived — a reflection of your essence that shines wherever you go.
            </p>

            <p
              className="text-lg md:text-xl text-rose-800 leading-relaxed"
              data-aos="fade-up"
            >
              Our story is one of craftsmanship, authenticity, and allure. With carefully curated designs and exquisite materials,{" "}
              <span className="italic text-rose-900 font-bold">Luxe Aura</span> invites you to discover jewelry that speaks to your spirit and complements your fragrance.
            </p>
          </div>
        </div>
      </section>
      
      {/* Craftsmanship Spotlight */}
      <section className="py-10 px-6" data-aos="fade-up">
        <h2 className="text-3xl font-serif text-center mb-12 text-rose-900 font-bold">
          Signature Craftsmanship
        </h2>
        <div
          // className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          data-aos="slide-right"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  <div className="group bg-rose-200 shadow-md p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2 text-rose-900 group-hover:text-rose-600">
      Handcrafted Detail
    </h3>
    <p className="text-gray-600 group-hover:text-gray-800">
      Each piece is meticulously designed by artisans to embody timeless elegance.
    </p>
  </div>
  <div className="group bg-rose-200 shadow-md p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2 text-rose-900 group-hover:text-rose-600">
      Premium Materials
    </h3>
    <p className="text-gray-600 group-hover:text-gray-800">
      From gold to gemstones, we source only the finest materials for lasting beauty.
    </p>
  </div>
  <div className="group bg-rose-200 shadow-md p-6 rounded-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2 text-rose-900 group-hover:text-rose-600">
      Unique Designs
    </h3>
    <p className="text-gray-600 group-hover:text-gray-800">
      Our collections celebrate individuality, ensuring every piece tells your story.
    </p>
  </div>
</div>

        </div>
      </section>

      {/* Testimonials Section */}
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-rose-900">
              What Our Clients Have to Say
            </h2>
            <p className="text-lg mt-2 text-rose-900">
              Real stories from real customers
            </p>
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
                    {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
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

export default JewelryStory;