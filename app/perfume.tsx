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



export default function Perfume() {
  const [selectedMood, setSelectedMood] = useState("All");

  const perfumes = [
    {
      id: 1,
      title: "Miss Dior Rose N’Roses",
      image: dior,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Romantic",
    },
    {
      id: 2,
      title: "Narciso Rodriguez for Her",
      image: narciso,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Romantic",
    },
    {
      id: 3,
      title: "Yves Saint Laurent Mon Paris",
      image: ysl,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Bold",
    },
    {
      id: 4,
      title: "Viktor & Rolf Flowerbomb",
      image: viktor,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Bold",
    },
    {
      id: 5,
      title: "Tom Ford Velvet Orchid",
      image: tom,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Bold",
    },
    {
      id: 6,
      title: "Jo Malone Peony & Blush Suede",
      image: jo,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Serene",
    },
    {
      id: 7,
      title: "Chanel Coco Mademoiselle",
      image: chan,
      price: "₦493,000",
      link: "/perfume/palazzo-noir",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Romantic",
    },
    {
      id: 8,
      title: "Lalique L’Amour",
      image: lamour,
      price: "₦865,000",
      link: "/perfume/velvet-bloom",
      notes: "Top notes: rose, vanilla, amber",
      mood: "Serene",
    },
    {
      id: 9,
      title: "Marc Jacobs Perfect",
      image: jacob,
      price: "₦865,000",
      link: "/perfume/ivory-whisper",
      notes: "Top notes: rose, vanilla, amber",
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
        className="relative text-rose-900 py-32 px-6 md:px-20 bg-cover bg-no-repeat h-125"
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
      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum">
        {/* Filter Bar */}
        <div className="flex justify-center space-x-4 mb-12">
          {["All", "Romantic", "Bold", "Serene","Soft"].map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-4 py-2 rounded-full border ${
                selectedMood === mood
                  ? "bg-rose-900 text-[#fffff0]"
                  : "border-rose-900 text-rose-900"
              } hover:bg-rosegold hover:text-white transition`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-16">
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
    >
      {/* Hover Note Preview */}
      <div className="absolute bottom-0 left-0 w-full bg-rose-900 text-white text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {notes}
      </div>

      {/* Product Image */}
      <img src={image} alt={title} className="h-[350px] w-full object-cover" />

      {/* Card Content */}
      <div className="p-6 bg-rose-200 group-hover:bg-rosegold transition-colors">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-rose-900">
          {title}
        </h3>
        <p className="text-sm mb-4 group-hover:text-rose-900">{price}</p>
        <span className="text-rosegold group-hover:text-rose-900 font-medium underline underline-offset-2">
          View Details →
        </span>
      </div>
    </a>
  );
}