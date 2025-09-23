// import section1 from "./aura1.jpg"
// import section2 from "./aura1.jpg"
// import section3 from "./aura1.jpg"

// type moodprop={
//     title:string,
//     description:string,
//     image:string,
//     link:string

// }


// function MoodCard ({ title, description, image, link }:moodprop) {
//   return (
//     <a href={link} className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
//       <div
//         className="h-64 bg-cover bg-center"
//         style={{ backgroundImage: `url(${image})` }}
//       />
//       <div className="p-6 bg-ivory group-hover:bg-rosegold transition-colors">
//         <h3 className="text-2xl font-semibold mb-2 group-hover:text-white">{title}</h3>
//         <p className="text-sm group-hover:text-white">{description}</p>
//       </div>
//       <section className="bg-white py-20 px-6 md:px-20 text-deepplum">
//   <div className="text-center mb-12">
//     <h2 className="text-4xl font-serif font-bold mb-4">Find Your Aura</h2>
//     <p className="text-lg text-rosegold italic">Shop by mood, not just by category</p>
//   </div>

//   <div className="grid md:grid-cols-3 gap-8">
//     {/* Mood Card 1: Romantic */}
//     <MoodCard
//       title="Romantic"
//       description="Soft florals, rose gold accents, and scents that linger like love notes."
//       image={section1}
//       link="/collections/romantic"
//     />

//     {/* Mood Card 2: Bold */}
//     <MoodCard
//       title="Bold"
//       description="Deep plum tones, statement jewelry, and fragrances that command attention."
//       image={section2}
//       link="/collections/bold"
//     />

//     {/* Mood Card 3: Serene */}
//     <MoodCard
//       title="Serene"
//       description="Ivory palettes, minimalist pieces, and fresh notes that calm the soul."
//       image={section3}
//       link="/collections/serene"
//     />
//   </div>
// </section>
//     </a>
//   );
// }