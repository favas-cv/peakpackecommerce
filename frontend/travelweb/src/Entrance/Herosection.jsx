import React from "react";
import { useNavigate } from "react-router-dom";
import Activitybar from "./Activitybar";
import Topsellingproducts from "./Seasonalproducts";
import Dealoftheday from "./Dealoftheday";
import Featuredcategories from "./Featuredcategories";
import Navbar from "./Navbar";

function Hero() {
  const nav = useNavigate();
  return (
    <>


      <div className="relative w-full min-h-200 bg-grey-500">
        <img
          src="/images/hero7.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-200 object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 md:px-20 text-white">
          <h1 className="text-5xl md:text-7xl mt-30  font-bold mb-4">
            PACK <br /> FOR THE PEAKS
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-6">
            A one-stop platform for all your adventure and travel essentials.” 
          </p>
          <button
            onClick={() => nav('/shop')}
            className="relative px-6 py-3 rounded-lg font-semibold text-gray-800 
            bg-white border border-gray-200 overflow-hidden group shadow-lg"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200 to-transparent 
              -translate-x-full group-hover:translate-x-full 
              transition-transform duration-700 ease-in-out"></span>

            <span className="relative z-10">Shop Now →</span>
          </button>

          <br />

        </div>
      </div>
<div className="bg-green-900 text-white">
              {/* <Activitybar /> */}

</div>
      <div className="relative z-10">
        <Featuredcategories />
        <Topsellingproducts />
        <Dealoftheday />

      </div>

    
    </>
  );
}

export default Hero;
