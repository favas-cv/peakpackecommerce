import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Usercontext } from "../context/Usercontext";
import { Bagcontext } from "../context/Bagcontext";
import { Favoritescontext } from "../context/Favoritescontext";

function Profilepage() {
  const nav = useNavigate();
  const { user, setuser } = useContext(Usercontext);
  const { favCount, favItems, setFavitems } = useContext(Favoritescontext);
  const { bagCount, loading } = useContext(Bagcontext); 

  const logouting = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("favorites");

    toast.success("Logged out successfully");
    nav("/");
    setuser(null);
    setFavitems([]);



  };


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

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <div className="flex gap-6 text-gray-700">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => nav("/bag")}
              >
                <FaShoppingCart className="text-xl text-blue-500" />
                <span>{bagCount}</span>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => nav("/favorites")}
              >
                <FaHeart className="text-xl text-red-500" />
                <span>{favCount}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">Account Information</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          {user.address && (
            <div className="mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> Address
              </h2>
              <p><strong>Full Name:</strong> {user.address.Fullname}</p>
              <p><strong>Street:</strong> {user.address.StreetAddress}</p>
              <p><strong>City/State/ZIP:</strong> {user.address.City_State_zip}</p>
              <p><strong>Phone:</strong> {user.address.Phone}</p>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 bg-orange-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={() => nav("/orderconfirmation")}
            >
              My Orders
            </button>
            <button
              className="flex-1 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => nav("/shop")}
            >
              Shop More
            </button>
            <button
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={logouting}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profilepage;
