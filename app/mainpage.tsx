import React, { useState } from 'react';
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
    image: chance,
    hoverImage: chance2,
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
    image: chance,
    hoverImage: chance2,
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
    image: chance,
    hoverImage: chance2,
  },
  // Add more products...
];


function ProductSlider() {
    
  return (
    <section className="py-16 px-20 bg-white relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <button className="border border-black px-4 py-2 uppercase hover:bg-black hover:text-white transition">
          Shop All
        </button>
      </div>

 <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 cursor-pointer custom-prev">
  <button className="bg-[#FFFFF0] text-pink-300 p-2 text-3xl rounded-full hover:bg-pink-300 hover:text-[#FFFFF0]">
    <FaChevronLeft />
  </button>
</div>

<div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 cursor-pointer custom-next">
  <button className="bg-[#FFFFF0] text-pink-300 text-3xl p-2 rounded-full hover:bg-pink-300 hover:text-[#FFFFF0]">
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
        // className="swiper-button-prev swiper-button-next"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
    
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
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

export default ProductSlider;