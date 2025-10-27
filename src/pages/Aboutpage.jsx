import React from "react";
import { Link } from "react-router-dom";
import { FaGlobe, FaCompass, FaCheckCircle } from "react-icons/fa"; // Added icons for visual appeal

function About() {
  return (

           <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/shadowbg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#c1e3b9ff' // Fallback color
      }}

    > 
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16  min-h-screen">
      
      {/* Hero Image Section */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-sky-950/20">
        <img
          // Use a relevant placeholder image until the actual logo/banner is ready
          src="images/fullogo.jpg"
          alt="Adventurer looking at mountain vista"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-sky-950/30"></div> {/* Subtle dark overlay for contrast */}
        {/* Removed "Our Journey" text from here */}
      </div>
      {/* --- */}

      {/* Our Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-sky-950 border-l-4 border-lime-500 pl-3">Our Story</h2>
        {/* Restored original Our Story paragraph */}
        <p className="text-gray-700 leading-relaxed text-lg">
          PeakPack was created for adventurers who crave exploration without compromise. 
          We believe every journey deserves top-quality gear — durable, reliable, and designed 
          for explorers who push limits. From mountains to beaches, we ensure you travel 
          further, safer, and in style.
        </p>
      </section>
      {/* --- */}

      {/* Mission & Vision Section (Both in sky-950) */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-sky-950 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <FaCompass className="text-4xl text-lime-500 mb-4" />
          <h3 className="text-2xl font-semibold mb-3 text-white">Our Mission</h3>
          <p className="text-gray-300">
            To provide premium travel and adventure gear that enhances every journey, 
            making it safe, enjoyable, and unforgettable.
          </p>
        </div>
        <div className="bg-sky-950 p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"> {/* Changed to bg-sky-950 */}
          <FaGlobe className="text-4xl text-lime-500 mb-4" /> {/* Kept lime icon for contrast */}
          <h3 className="text-2xl font-semibold mb-3 text-white">Our Vision</h3> {/* Changed to text-white */}
          <p className="text-gray-300"> {/* Changed to text-gray-300 */}
            To inspire a global community of explorers who are ready for any adventure, 
            equipped with the best gear.
          </p>
        </div>
      </section>
      {/* --- */}

      {/* Why Choose PeakPack Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-sky-950 border-l-4 border-lime-500 pl-3">Why Choose PeakPack?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit Card 1: Quality */}
            <div className="p-5 bg-lime-50 rounded-lg border-t-4 border-lime-500 shadow-md">
                <FaCheckCircle className="text-2xl text-lime-600 mb-2" />
                <h4 className="font-bold text-lg text-sky-950 mb-1">Uncompromising Quality</h4>
                <p className="text-sm text-gray-700">Durable, high-quality products built to last in tough conditions.</p>
            </div>
            
            {/* Benefit Card 2: Value */}
            <div className="p-5 bg-lime-50 rounded-lg border-t-4 border-lime-500 shadow-md">
                <FaCheckCircle className="text-2xl text-lime-600 mb-2" />
                <h4 className="font-bold text-lg text-sky-950 mb-1">Exceptional Value</h4>
                <p className="text-sm text-gray-700">Affordable prices without ever sacrificing product integrity.</p>
            </div>
            
            {/* Benefit Card 3: Trust */}
            <div className="p-5 bg-lime-50 rounded-lg border-t-4 border-lime-500 shadow-md">
                <FaCheckCircle className="text-2xl text-lime-600 mb-2" />
                <h4 className="font-bold text-lg text-sky-950 mb-1">Explorer Tested</h4>
                <p className="text-sm text-gray-700">Our gear is rigorously tested and trusted by real-world adventurers.</p>
            </div>
            
            {/* Benefit Card 4: Sustainability */}
            <div className="p-5 bg-lime-50 rounded-lg border-t-4 border-lime-500 shadow-md">
                <FaCheckCircle className="text-2xl text-lime-600 mb-2" />
                <h4 className="font-bold text-lg text-sky-950 mb-1">Sustainable Choice</h4>
                <p className="text-sm text-gray-700">Committed to eco-friendly practices and sustainable materials.</p>
            </div>

        </div>
      </section>
      {/* --- */}

      {/* Call to Action */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-xl text-sky-950 font-medium mb-6">Ready to begin your next great journey?</p>
        <Link
          to="/shop"
          className="inline-flex items-center px-10 py-4 bg-lime-500 text-sky-950 font-bold text-lg rounded-full hover:bg-lime-550 transition duration-300 transform hover:scale-105"
        >
          Start Exploring Gear
        </Link>
      </div>
    </div>
    </div>
  );
}

export default About;