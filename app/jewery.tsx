import { useState } from "react";
import img from "./jewery_hero.jpg"
import jewel1 from "./jewel1.jpg"
import { FaLongArrowAltRight } from "react-icons/fa";
import whisperChain from "./Whisper Chain Necklace.jpg"
import museHoops from "./Muse Gold Hoops.jpg"
import ivoryRing from "./Ivory Statement Ring.jpg"
import auraWatch from "./Aura Gold Watch.jpg"
import silkBracelet from "./Silk Wrap Bracelet.jpg"






export default function jewery(){
    const [selectedType, setSelectedType] = useState("All");
    
     const jewelryItems = [
       {
         id: 1,
         title: "Whisper Chain Necklace",
         image: whisperChain,
         price: "₦265,000",
         link: "/jewelry/whisper-chain",
         type: "Necklace",
       },
       {
         id: 2,
         title: "Muse Gold Hoops",
         image: museHoops,
         price: "₦185,000",
         link: "/jewelry/muse-hoops",
         type: "Earrings",
       },
       {
         id: 3,
         title: "Ivory Statement Ring",
         image: ivoryRing,
         price: "₦215,000",
         link: "/jewelry/ivory-ring",
         type: "Ring",
       },{
         id: 4,
         title: "Aura Gold Watch",
         image: auraWatch,
         price: "₦495,000",
         link: "/jewelry/aura-watch",
         type: "Watch",
       },
       {
         id: 5,
         title: "Silk Wrap Bracelet",
         image: silkBracelet,
         price: "₦175,000",
         link: "/jewelry/silk-bracelet",
         type: "Bracelet",
       },
     ];
    
     const filteredJewelry = jewelryItems.filter((item) =>
       selectedType === "All" ? true : item.type === selectedType
     );
    
    
    return(
        <div>
             {/* Hero Section */}
      <section
        className="relative text-[#fffff0] py-32 px-6 md:px-20 bg-cover bg-no-repeat h-148" 
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0"></div>
        {/* Content */}
  <div className="relative z-10 max-w-3xl mx-auto text-center mt-25">
    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
      Jewelry That Speaks Without Words
    </h1>
    <p className="text-lg md:text-xl italic mb-8 text-rosegold">
      Minimalist forms. Maximal emotion. Crafted to whisper elegance.
    </p>
    <div className="flex justify-center space-x-6">
      <a
        href="/jewelry/shop"
        className="bg-rosegold text-rose-900 px-6 py-3 font-bold rounded-2xl hover:bg-rose-900 hover:text-[#fffff0] transition"
      >
        Shop Jewelry
      </a>
      <a
        href="/journal/jewelry-language"
        className="border border-rose-900 text-rose-900 px-6 py-3 rounded-2xl font-bold hover:bg-rose-900 hover:text-[#fffff0] transition"
      >
        Read the Story
      </a>
    </div>
  </div>

      </section>

      <section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] from- py-20 px-6 md:px-20 text-deepplum" data-aos="fade-up">
         <blockquote className="italic text-rose-900 text-xl flex my-4  justify-center items-center-safe border-l-4 border-rose-900 pl-4">
        “Elegance isn’t worn—it’s felt.”
      </blockquote>
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Image */}
    <div>
      <img
        src={jewel1}
        alt="Minimalist gold jewelry on silk"
        className="rounded-lg shadow-lg object-cover w-full h-full"
      />
    </div>

    {/* Text */}
    <div>
      <h2 className="text-4xl font-serif font-bold mb-6 text-rose-900">The Language of Jewelry</h2>
      <p className="text-lg leading-relaxed mb-6 text-rose-900">
        At <span className="italic font-semibold">Luxe Aura</span>, jewelry is more than adornment—it’s a silent conversation. Each piece is designed to express emotion, mood, and presence without saying a word.
      </p>
      <p className="text-lg leading-relaxed mb-8 text-rose-900">
        From delicate chains to bold silhouettes, our collections are crafted to whisper elegance and amplify your aura.
      </p>
      <a
        href="/journal/jewelry-language"
        className="text-rose-900 font-medium hover:text-deepplum transition flex gap-3 items-center"
      >
        Read the full story <FaLongArrowAltRight />
      </a>
    </div>
  </div>
</section>
<section className="bg-gradient-to-r from-[#FFFFF0] via-rose-200 to-[#FFFFF0] py-20 px-6 md:px-20 text-deepplum">
      {/* Filter Bar */}
      <div className="flex justify-center space-x-4 mb-12">
        {["All", "Ring", "Necklace", "Bracelet", "Watch", "Earrings"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-full border ${
              selectedType === type
                ? "bg-rose-900 text-[#fffff0]"
                  : "border-rose-900 text-rose-900"
              } hover:bg-rosegold hover:text-rose-400 transition`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-16 text-rose-900">
        <h2 className="text-4xl font-serif font-bold mb-4">Our Signature Pieces</h2>
        <p className="text-lg text-rosegold italic">
          Curated by type, crafted to elevate your aura
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {filteredJewelry.map((item) => (
          <JewelryCard key={item.id} {...item} />
            ))}
      </div>
    </section>

        </div>
    )
}
type jewelprop={
    title:string,
    image:string,
    price:string,
    link:string
}
function JewelryCard({ title, image, price, link }:jewelprop) {
  return (
    <a href={link} className="relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group border border-rose-100"
     data-aos='fade-up'>
      <img src={image} alt={title} className="h-[350px] w-full object-cover" />
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