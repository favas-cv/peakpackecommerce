import React, { useContext } from 'react';
import useFetch from '../Customhooks/Fetchinghook';
import { Bagcontext } from '../context/Bagcontext';
import { Favoritescontext } from '../context/Favoritescontext';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


function Topsellingproducts() {
  const { data: products, loading, error } = useFetch(`http://localhost:8000/products?season=Winter`);
  const { addtoBag } = useContext(Bagcontext);
  const { addtoFav ,favItems,toggleFav} = useContext(Favoritescontext);
  const nav = useNavigate();


 if (loading) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-green-800 text-lg font-semibold animate-pulse">
        Please wait, products are loading...
      </p>
    </div>
  );
}
  
  if (error) return <p className="text-center mt-10 text-red-500">Error loading products</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Seasonal Specials (WINTER)</h1>
      
      <div className="overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {products.map((product) => (
            <div
            onClick={()=>nav(`/shop/${product.id}`)}
              key={product.id}
              className="relative min-w-[220px] bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-2xl flex-shrink-0 hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
             <button
                           className="absolute top-3 right-3 z-10 p-2"
                           aria-label="Add to wishlist"
                           onClick={(e) => {
                             e.stopPropagation();
                             toggleFav(product);
                           }}
                         >
                           {favItems.some(f => f.id === product.id) ? (
                             <AiFillHeart className="text-red-500 text-2xl" />
                           ) : (
                             <AiOutlineHeart className="text-black text-2xl" />
                           )}
                         </button>

              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <p className="text-gray-500 text-xs mt-1">
                  {product.category} | {product.season}
                </p>
                <p className="mt-2 font-bold text-lg text-gray-800">${product.price}</p>

                <button
                  onClick={(e) =>{
                    e.stopPropagation();

                    addtoBag(product)}
                  } 
                  className="mt-3 w-full bg-green-900 text-white text-sm font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Topsellingproducts;
