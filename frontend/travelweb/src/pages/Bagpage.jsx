import React, { useContext, useState,useEffect } from 'react';
import { Bagcontext } from '../context/Bagcontext';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../context/Usercontext';

function Bagpage() {
  const { bagItems, subtotal, charge, removefromBag, increaseQuantity, decreaseQuantity, bagTotal,loading } = useContext(Bagcontext);
  const nav = useNavigate();
  const {user} = useContext(Usercontext);

  if(loading && user){
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white/70 z-50">
      <div className="relative w-20 h-20">
        <div className="absolute w-full h-full border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-green-800 text-lg font-semibold animate-pulse mt-4">
        Please wait, your Bag are loading...
      </p>
    </div>
    )
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

  if (bagItems.length === 0) {
    return <h2 className="text-center text-2xl mt-20 text-gray-400">Your bag is empty 😔</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 border-b pb-4 text-gray-700">Your Bag</h1>
      
      <div className="space-y-6">
        {bagItems.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row items-center md:items-start justify-between border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-gray-800">{item.name}</h2>
                <p className="text-gray-500 text-sm">Price: <span className="font-semibold">${item.price}</span></p>
                <p className="text-gray-500 text-sm">Quantity: <span className="font-semibold">{item.quantity}</span></p>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
              <div className="flex gap-2">
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  +
                </button>
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  -
                </button>
              </div>
              <button
                onClick={() => removefromBag(item.id)}
                className="px-4 py-1 rounded border border-red-400 text-red-500 font-medium hover:bg-red-50 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>




      <div className="mt-8 flex flex-col md:flex-row justify-end gap-6">
        <div className="border rounded-lg p-4 shadow-sm w-full md:w-1/3 bg-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Order Summary</h2>
          <div className="flex justify-between mb-1 text-gray-600">
            <span>Subtotal:</span>
            <span className="font-medium">${Math.round(bagTotal)}</span>
          </div>
          <div className="flex justify-between mb-1 text-gray-600">
            <span>Delivery:</span>
            <span className="font-medium">${charge}</span>
          </div>
          <hr className="my-2 border-gray-300"/>
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>${Math.round(subtotal)}</span>
          </div>
          <button
            className="mt-4 w-full py-2 rounded border border-gray-400 text-gray-800 font-semibold hover:bg-gray-200 transition"
            onClick={() => nav('/orderdetailpage')}
          >
            place order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bagpage;
