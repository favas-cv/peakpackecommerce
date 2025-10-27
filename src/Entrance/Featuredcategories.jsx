import React from "react";
import { useNavigate } from "react-router-dom";

function Featuredcategories() {
  const categories = [
    { name: "Tent", image: "/images/t1.jpg" },
    { name: "Jacket", image: "/images/jw4.jpg" },
    { name: "Boots", image: "/images/shoe.jpg" },
  ];

  const nav = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ✅ Heading — always visible */}
      <div className="flex justify-center">
        <h2 className="text-3xl  font-bold mb-6">Featured Categories</h2>
      </div>

      {/* ✅ Categories — hidden only on mobile */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => nav(`/shop?name=${cat.name}`)}
              className="bg-white shadow rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Seasonal Essentials — visible on all screens */}
      <div className="block mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Winter Card */}
          <div
            onClick={() => nav(`/shop?season=Winter`)}
            className="relative h-24 sm:h-28 rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src="/images/winteress.png"
              alt="Winter Essentials"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl font-semibold">
                Winter Essentials
              </h3>
            </div>
          </div>

          {/* Summer Card */}
          <div
            onClick={() => nav(`/shop?season=Summer`)}
            className="relative h-24 sm:h-28 rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src="/images/summeress.png"
              alt="Summer Gear"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl font-semibold">
                Summer Gear
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featuredcategories;
