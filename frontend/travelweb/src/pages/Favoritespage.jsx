import React, { useContext, useEffect, useState } from 'react';
import { Favoritescontext } from '../context/Favoritescontext';
import { Bagcontext } from '../context/Bagcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Usercontext } from '../context/Usercontext';

function Favoritespage() {
  const { favItems, addtoFav, removefromFav, clearFav ,loading } = useContext(Favoritescontext);
  const { addtoBag } = useContext(Bagcontext);
  const {user,setuser} = useContext(Usercontext);
  const nav = useNavigate();

  if (loading && user) {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/70 z-50">
      <div className="relative w-20 h-20">
        <div className="absolute w-full h-full border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-red-500 text-lg font-semibold animate-pulse mt-4">
        Please wait, your favorites are loading...
      </p>
    </div>
  );
}



  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>You are not logged in</p>
        <button
          className="bg-green-800 backdrop-blur-md text-white px-4 py-2 rounded mt-4"
          onClick={() => nav("/loginpage")}
        >
          Login
        </button>
      </div>
    );
  }

  if (favItems.length === 0) {
    return <h2 className="text-center mt-20 text-2xl font-semibold text-gray-400">No favorite items 😔</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 border-b pb-2 text-gray-700">❤️ My Favorites</h1>

      <div className="flex flex-col space-y-4">
        {favItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg md:mr-6 border border-gray-200" />


            <div className="flex-1 mt-2 md:mt-0">
              <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
              <p className="text-gray-500 mt-1 text-sm">Price: <span className="font-semibold text-gray-900">${item.price}</span></p>
            </div>


            <div className="flex mt-3 md:mt-0 gap-2 flex-col sm:flex-row">
              <button
                onClick={() => addtoBag(item, item.id)}
                className="px-4 py-2 rounded border border-gray-400 text-gray-800 font-medium hover:bg-gray-100 transition shadow-sm"
              >
                Add to Bag
              </button>
              <button
                onClick={() => removefromFav(item.id)}
                className="px-4 py-2 rounded border border-red-400 text-red-500 font-medium hover:bg-red-50 transition shadow-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-6 text-right">
        <button
          onClick={clearFav}
          className="px-6 py-2 rounded border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition shadow-sm"
        >
          Clear All Favorites
        </button>
      </div>
    </div>
  );
}

export default Favoritespage;
