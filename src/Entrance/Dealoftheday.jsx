import React, { useContext } from 'react';
import useFetch from '../Customhooks/Fetchinghook';
import { Bagcontext } from '../context/Bagcontext';
import { Favoritescontext } from '../context/Favoritescontext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Dealoftheday() {
  const { addtoBag } = useContext(Bagcontext);
  const { favItems, toggleFav } = useContext(Favoritescontext);
  const nav = useNavigate();

  // Assuming you want more than one product for "Deal of the Day", let's limit it for the horizontal view
  const { data: products, loading, error } = useFetch('https://peakpackbackend.onrender.com/products?season=Summer&_limit=8');

  // Loading State - Themed
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-500"></div>
        <p className="text-sky-950 text-lg font-semibold animate-pulse mt-4">
          Finding the best summer deals...
        </p>
      </div>
    );
  }

  // Error State - Themed
  if (error) return <p className="text-center mt-10 text-red-500">Something went wrong! Failed to load deals.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      
    
      <h2 className="text-3xl font-extrabold mb-8 text-sky-950 text-center">Deal Of The Week !</h2>

      
   
      
      {/* Horizontal Scrollable Product List */}
      <div className="relative">
        <div 
          className="flex overflow-x-scroll no-scrollbar py-4 -mx-4 px-4 gap-6" // Hides scrollbar
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => nav(`/shop/${product.id}`)}
              // Clean, simple card style
              className="relative flex-shrink-0 w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer border border-gray-100"
            >
              
              {/* Wishlist Button */}
              <button
                className="absolute top-3 right-3 z-10 p-1 bg-white rounded-full shadow-md hover:shadow-lg transition"
                aria-label="Add to wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(product);
                }}
              >
                {favItems.some(f => f.id === product.id) ? (
                  <AiFillHeart className="text-red-500 text-xl" />
                ) : (
                  <AiOutlineHeart className="text-sky-950 text-xl" /> // Themed outline color
                )}
              </button>

              {/* Product Image */}
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover transform hover:scale-105 transition duration-500"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-base truncate text-sky-950 mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs font-light">
                  {product.category} | {product.season}
                </p>
                
                {/* Price - Themed */}
                <p className="mt-3 font-extrabold text-xl text-sky-950">${product.price}</p>

                {/* Add to Bag Button - Themed */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addtoBag(product);
                  }}
                  className="mt-4 w-full bg-lime-500 text-sky-950 text-base font-bold py-2.5 rounded-lg hover:bg-lime-600 transition shadow-md"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dealoftheday;