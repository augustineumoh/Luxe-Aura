import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import hero1 from './hero3.jpg';
import hero from './hero7.jpg';
import hero2 from './hero9.jpg';
import hero3 from './hero.jpg';
import hero4 from './hero1.jpg';
import { Link } from 'react-router';

const images = [hero, hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <section className="relative h-screen overflow-hidden mx-auto max-w-screen" data-aos="fade-up">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-screen bg-cover overflow-x-hidden bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
  <div className="text-center max-w-xl text-rose-900" data-aos="fade-up">
    <h1 className="text-5xl font-bold mb-4">Welcome to Luxe Aura</h1>
    <p className="text-lg mb-8 font-bold">Elevate your elegance.</p>
    <Link to="/shop_all"><button className="border border-rose-900 font-bold text-rose-900 px-6 py-3 rounded-2xl uppercase tracking-wide hover:bg-rose-900 hover:text-[#FFFFF0] transition" data-aos="">
      Shop Now
    </button></Link>
    <button className="ml-4 border uppercase font-bold border-rose-900 px-6 py-3 hover:bg-rose-900 hover:text-[#FFFFF0] rounded-2xl transition" data-aos="">Learn More</button>
  </div>
</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroCarousel;