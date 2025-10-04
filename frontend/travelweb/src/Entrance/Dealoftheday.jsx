import React, { useContext } from 'react'
import useFetch from '../Customhooks/Fetchinghook'
import { Bagcontext } from '../context/Bagcontext'
import { Favoritescontext } from '../context/Favoritescontext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


function Dealoftheday() {
  const { addtoBag } = useContext(Bagcontext)
  const { favItems,addtoFav, toggleFav } = useContext(Favoritescontext);
  const nav = useNavigate();


  const { data: products, loading, error } = useFetch('http://localhost:8000/products?season=Summer')

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

  if (error) return <p>Something went wrong!</p>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Deal of the Day</h1>
      <div className="overflow-x-auto">
        <div className="flex gap-6">
          {products.map((product) => (
            <div
              onClick={() => nav(`/shop/${product.id}`)}
              key={product.id}
              className="min-w-[200px] bg-white/80 backdrop-blur-md text-black rounded-xl shadow-lg flex-shrink-0 hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>

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

              <div className="p-3">
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <p className="text-gray-600 text-xs">
                  {product.category} | {product.season}
                </p>
                <p className="mt-1 font-bold text-base">${product.price}</p>

                <button
                  onClick={(e) => { e.stopPropagation(); addtoBag(product) }} className="mt-3 w-full bg-green-900 text-white text-sm font-medium py-2 rounded hover:bg-gray-800 transition">
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Dealoftheday
