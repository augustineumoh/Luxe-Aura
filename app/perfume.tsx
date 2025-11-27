import { useState } from "react"
import img from "./perfume page.jpg"
import chan from "./chanel romantic.jpg"
import lamour from "./lamour romantic.jpg"
import jacob from "./jacob romantic.jpg"
import dior from "./dior romanic.jpg"
import narciso from "./narciso romantic.jpg"
import ysl from "./ysl romantic.jpg"
import viktor from "./viktor.jpg"
import tom from "./tom romantic.jpg"
import jo from "./blush romantic.jpg"
import maison from "./replica bold.jpg"
import opium from "./opium bold.jpg"
import interlude from "./interlude.jpg"
import dior_b from "./dior bold.jpg"
import oud from "./oud.jpg"
import sha from "./sha bold.jpg"
import mill from "./millon.jpg"
import luten from "./luten bold.jpg"
import irish from "./memo.jpg"
import { FaLongArrowAltRight } from "react-icons/fa";
import eau from "./chanel soft.jpg"
import glossier from "./Glossier soft.jpg"
import amazing from "./amazing soft.jpg"
import clean from "./clean.jpg"
import daisy from "./daisy.jpg"
import jasmine from "./jasmine.jpg"
import burberry from "./burberry.jpg"
import maisonf from "./maison.jpg"
import musk from "./musk.jpg"
import lazy from "./lazy.jpg"
import blanche from "./blanche.jpg"
import heretic from "./musk serene.jpg"
import malin from "./malin.jpg"
import xtra from "./xtra.jpg"
import cashmere from "./korres.jpg"
import chloe from "./chloe serene.jpg"
import missing from "./phlur.jpg"
import maisonfrancis from "./maison Francis.jpg"



export default function Perfume() {
  const [selectedMood, setSelectedMood] = useState("All");

  const perfumes = [
    {
      id: 1,
      title: "Miss Dior Rose N’Roses",
      image: dior,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: A youthful mix of Damask and Grasse roses with citrus accents—flirtatious and refined.",
      mood: "Romantic",
    },
    {
      id: 2,
      title: "Narciso Rodriguez for Her",
      image: narciso,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: Sensual musk, rose, and soft woods create a whisper of intimacy and elegance.",
      mood: "Romantic",
    },
    {
      id: 3,
      title: "Yves Saint Laurent Mon Paris",
      image: ysl,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Passionate and modern with strawberry, raspberry, and white florals—perfect for a night out.",
      mood: "Romantic",
    },
    {
      id: 4,
      title: "Viktor & Rolf Flowerbomb",
      image: viktor,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: An explosion of jasmine, orange blossom, and patchouli—sweet and seductive.",
      mood: "Romantic",
    },
    {
      id: 5,
      title: "Tom Ford Velvet Orchid",
      image: tom,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: Bold and sensual with black orchid, honey, and rum—ideal for making a statement.",
      mood: "Romantic",
    },
    {
      id: 6,
      title: "Jo Malone Peony & Blush Suede",
      image: jo,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Soft peony, red apple, and suede—elegant and flirtatious, like a romantic daydream.",
      mood: "Romantic",
    },
    {
      id: 7,
      title: "Chanel Coco Mademoiselle",
      image: chan,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: A timeless blend of citrus, rose, and patchouli that radiates elegance and allure.",
      mood: "Romantic",
    },
    {
      id: 8,
      title: "Lalique L’Amour",
      image: lamour,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: Delicate floral notes of rose, gardenia, and jasmine with a warm woody base—pure romantic poetry.",
      mood: "Romantic",
    },
    {
      id: 9,
      title: "Marc Jacobs Perfect",
      image: jacob,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Playful and fresh with almond milk, rhubarb, and daffodil—ideal for self-love and lighthearted romance.",
      mood: "Romantic",
    },
    {
      id: 10,
      title: "Maison Margiela Replica By the Fireplace",
      image: maison,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Smoky and warm, evoking burning wood and chestnut with a hint of vanilla",
      mood: "Bold",
    },
    {
      id: 11,
      title: "Yves Saint Laurent Opium",
      image: opium,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Spicy and exotic with notes of mandarin, jasmine, and deep amber",
      mood: "Bold",
    },
    {
      id: 12,
      title: "Amouage Interlude Man",
      image: interlude,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Complex and intense, blending oregano, incense, and leather",
      mood: "Bold",
    },
    {
      id: 13,
      title: "Dior Fahrenheit",
      image: dior_b,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A fiery blend of leather, violet, and nutmeg with a distinctive gasoline-like edge",
      mood: "Bold",
    },
    {
      id: 14,
      title: "Le Labo Oud 27",
      image: oud,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Earthy and animalic, featuring oud, cedar, and incense",
      mood: "Bold",
    },
    {
      id: 15,
      title: "Guerlain Shalimar",
      image: sha,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A timeless oriental with bergamot, iris, and vanilla",
      mood: "Bold",
    },
    {
      id: 16,
      title: "Paco Rabanne 1 Million",
      image: mill,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Sweet and spicy with cinnamon, rose, and leather",
      mood: "Bold",
    },
    {
      id: 17,
      title: "Serge Lutens Chergui",
      image: luten,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Smoky and sweet with tobacco, honey, and hay",
      mood: "Bold",
    },
    {
      id: 18,
      title: "Memo Irish Leather",
      image: irish,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Green and leathery, evoking the Irish countryside with juniper and birch.",
      mood: "Bold",
    },
    {
      id: 19,
      title: "Chanel Chance Eau Tendre",
      image: eau,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A tender blend of grapefruit, jasmine, and white musk — airy and romantic",
      mood: "Soft",
    },
    {
      id: 20,
      title: "Glossier You",
      image: glossier,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Skin-like musk with iris and ambrette — intimate and barely-there.",
      mood: "Soft",
    },
    {
      id: 21,
      title: "Philosophy Amazing Grace",
      image: amazing,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Clean and powdery with bergamot, lily of the valley, and musk — pure and fresh.",
      mood: "Soft",
    },
    {
      id: 22,
      title: "Clean Reserve Skin",
      image: clean,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Warm and subtle with vanilla, praline, and musk — cozy and comforting.",
      mood: "Soft",
    },
    {
      id: 23,
      title: "Marc Jacobs Daisy",
      image: daisy,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Light and youthful with strawberry, violet leaves, and gardenia — playful and soft.",
      mood: "Soft",
    },
    {
      id: 24,
      title: "Aerin Ikat Jasmine",
      image: jasmine,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Delicate jasmine and honeysuckle — floral and serene.",
      mood: "Soft",
    },
    {
      id: 25,
      title: "Burberry Her Eau de Toilette",
      image: burberry,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Fruity and breezy with pear, peony, and musk — soft with a modern twist.",
      mood: "Soft",
    },
    {
      id: 26,
      title: "Maison Francis Kurkdjian Aqua Universalis",
      image: maisonf,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Crisp and clean with lemon, bergamot, and white flowers — like fresh laundry in spring.",
      mood: "Soft",
    },
    {
      id: 27,
      title: "The Body Shop White Musk",
      image: musk,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A classic soft musk with floral undertones — gentle and nostalgic.",
      mood: "Soft",
    },
    {
      id: 28,
      title: "Maison Margiela Replica Lazy Sunday Morning",
      image: lazy,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Aldehydes, pear, and lily of the valley recreate the feeling of clean sheets and a slow morning",
      mood: "Serene",
    },
    {
      id: 29,
      title: "Byredo Blanche Eau de Parfum",
      image: blanche,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Soft sandalwood and light florals inspired by the color white—minimalist and pure.",
      mood: "Serene",
    },
    {
      id: 30,
      title: "Heretic Parfum Bergamusk EDP",
      image: heretic,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Bergamot, white musk, and sandalwood offer a plant-based, aromatherapeutic calm.",
      mood: "Serene",
    },
    {
      id: 31,
      title: "Malin + Goetz Stem EDP",
      image: malin,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Earthy greens and freesia evoke the scent of a flower shop—natural and grounding.",
      mood: "Serene",
    },
    {
      id: 32,
      title: "Clean Reserve Warm Cotton",
      image: xtra,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Skin-like musk, amber, and bergamot create a comforting second-skin scent.",
      mood: "Serene",
    },
    {
      id: 33,
      title: "Korres Cashmere Kumquat Eau de Toilette",
      image: cashmere,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A gentle blend of citrus and cashmere woods—sweet and soothing.",
      mood: "Serene",
    },
    {
      id: 34,
      title: "Chloé Love Story Eau de Parfum",
      image: chloe,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Jasmine and neroli with fruity florals—fresh and romantic without being overpowering.",
      mood: "Serene",
    },
    {
      id: 35,
      title: "Phlur Missing Person",
      image: missing,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: A delicate mix of skin musk, bergamot, and jasmine—like a gentle memory on the skin.",
      mood: "Serene",
    },
    {
      id: 36,
      title: "Maison Francis Kurkdjian Aqua Universalis",
      image: maisonfrancis,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: Crisp citrus and white florals with musky woods—like freshly laundered linen on a summer day.",
      mood: "Serene",
    },
  ];

  const filteredPerfumes = perfumes.filter((p) =>
    selectedMood === "All" ? true : p.mood === selectedMood
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-[#fffff0] py-32 px-6 md:px-20 bg-cover bg-no-repeat h-148" 
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center mt-30">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Discover Your Signature Scent
          </h1>
          <p className="text-lg font-bold md:text-xl italic mb-8 text-rosegold">
            Perfumes that whisper elegance and linger like memory
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="/perfume/shop"
              className="bg-rosegold text-rose-900 px-6 py-3 font-bold rounded-2xl hover:bg-rose-900 hover:text-[#fffff0] transition"
            >
              Shop Perfumes
            </a>
            <a
              href="/perfume/story"
              className="border border-rose-900 text-rose-900 px-6 py-3 rounded-2xl font-bold hover:bg-rose-900 hover:text-[#fffff0] transition"
            >
              Our Fragrance Story
            </a>
          </div>
        </div>
      </section>

      {/* Filter + Product Grid */}
      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum" 
      id="mood-filter"
      data-aos='fade-up'>
        {/* Filter Bar */}
        <div className="flex justify-center space-x-4 mb-12" data-aos='fade-right'>
          {["All", "Romantic", "Bold", "Serene","Soft"].map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-4 py-2 rounded-full border ${
                selectedMood === mood
                  ? "bg-rose-900 text-[#fffff0]"
                  : "border-rose-900 text-rose-900"
              } hover:bg-rosegold hover:text-rose-400 transition`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-16" data-aos='fade-right'>
          <h2 className="text-4xl font-serif font-bold mb-4 text-rose-900">
            Our Signature Scents
          </h2>
          <p className="text-lg text-rose-900 italic">
            Curated to match your mood, crafted to elevate your aura
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {filteredPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} {...perfume} />
          ))}
        </div>
      </section>
    </div>
  );
}

type perfumeprop={
    title:string,
    image:string,
    price:string,
    link: string,
    notes:string
}

// export default 
function PerfumeCard({ title, image, price, link, notes }:perfumeprop) {
  return (
    <a
      href={link}
      className="relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group border border-rose-100"
     data-aos='fade-up'>
      {/* Hover Note Preview */}
      <div className="absolute top-0 left-0 w-full bg-rose-900 text-white text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {notes}
      </div>

      {/* Product Image */}
      <img src={image} alt={title} className="h-[350px] w-full object-cover" />

      {/* Card Content */}
      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors text-rose-800">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-rose-900">
          {title}
        </h3>
        <p className="text-sm mb-4 group-hover:text-rose-900">{price}</p>
        <span className="text-rosegold group-hover:text-rose-900 font-medium flex items-center gap-3">
          View Details <FaLongArrowAltRight />
        </span>
      </div>
    </a>
  );
}