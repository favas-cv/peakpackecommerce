import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      
      <div className="relative border-1 h-72 md:h-96 rounded-xl overflow-hidden mb-12">
        <img
          src="/images/logopeakpack.jpg"
          alt="About PeakPack"
          className="w-full h-full object-cover"
        />
        
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-green-900">Our Story</h2>
        <p className="text-gray-800 leading-relaxed text-lg">
          PeakPack was created for adventurers who crave exploration without compromise. 
          We believe every journey deserves top-quality gear — durable, reliable, and designed 
          for explorers who push limits. From mountains to beaches, we ensure you travel 
          further, safer, and in style.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold mb-3 text-green-900">Our Mission</h3>
          <p className="text-gray-700">
            To provide premium travel and adventure gear that enhances every journey, 
            making it safe, enjoyable, and unforgettable.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-semibold mb-3 text-green-900">Our Vision</h3>
          <p className="text-gray-700">
            To inspire a global community of explorers who are ready for any adventure, 
            equipped with the best gear.
          </p>
        </div>
      </section>



      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-900">Why Choose PeakPack</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
          <li>Durable, high-quality products made for adventurers</li>
          <li>Affordable prices without compromising quality</li>
          <li>Tested and trusted by real explorers</li>
          <li>Eco-friendly and sustainable materials</li>
        </ul>
      </section>

      <div className="text-center mt-12">
        <Link
          to="/shop"
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition"
        >
          Explore Our Shop
        </Link>
      </div>
    </div>
  );
}

export default About;
