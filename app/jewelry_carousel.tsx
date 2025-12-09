import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import img from "./Triple Knot earing.jpg"
import img1 from "./rhinestone watch.jpg"
import img2 from "./rings1.jpg"
import img3 from "./pearl necklace.jpg"
import "swiper/css";
import "swiper/css/pagination";

const jewelryGallery = [
  {
    image: img,
    caption: "Ruby Ring — Crafted for Radiance",
  },
  {
    image: img1,
    caption: "Gold Necklace — Elegance Redefined",
  },
  {
    image: img2,
    caption: "Diamond Bracelet — Timeless Sparkle",
  },
  {
    image: img3,
    caption: "Emerald Earrings — Bold & Beautiful",
  },
];

export default function JewelryGalleryCarousel() {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-[#FFFFF0] via-rose-100 to-[#FFFFF0]">
      <h2 className="text-3xl font-serif text-center mb-12 text-rose-900 font-bold">
        Jewelry Gallery
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full max-w-3xl mx-auto"
      >
        {jewelryGallery.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.caption}
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
              <p className="mt-1 text-lg font-medium text-rose-800">
                {item.caption}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}