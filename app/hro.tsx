import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import hero1 from './upscalemedia-transformed.jpeg';
import hero from './hero7.jpg';
import hero2 from './hero2.jpg';
import hero3 from './hero5.jpg';
import hero4 from './hero8.jpeg';

const images = [hero, hero1, hero2, hero3, hero4];

function HeroCarousel() {
  return (
    <section className="relative h-screen overflow-hidden">
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
              className="h-screen bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              
              <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end items-center px-6 pb-5 text-black z-10">
  <div className="text-center max-w-xl">
    <h1 className="text-5xl font-bold mb-4">Welcome to Scentelle</h1>
    <p className="text-lg mb-8">Jewels for the skin. Scents for the soul.</p>
    <button className="border border-white font-bold text-black px-6 py-3 uppercase tracking-wide hover:bg-white hover:text-black transition">
      Shop Now
    </button>
    <button className="ml-4 border uppercase font-bold border-white px-6 py-3 hover:bg-white hover:text-black transition">Learn More</button>
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