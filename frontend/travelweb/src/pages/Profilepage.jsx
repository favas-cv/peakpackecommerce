import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Icons: FaShoppingCart, FaHeart, FaMapMarkerAlt, FaSignOutAlt, FaBoxOpen, FaStore
import { FaShoppingCart, FaHeart, FaMapMarkerAlt, FaSignOutAlt, FaBoxOpen, FaStore } from "react-icons/fa"; 
import { toast } from "react-toastify";
import { Usercontext } from "../context/Usercontext";
import { Bagcontext } from "../context/Bagcontext";
import { Favoritescontext } from "../context/Favoritescontext";

function Profilepage() {
  const nav = useNavigate();
  const { user, setuser } = useContext(Usercontext);
  const { favCount, setFavitems } = useContext(Favoritescontext);
  const { bagCount, loading } = useContext(Bagcontext);

  const logouting = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");

    toast.success("Logged out successfully 👋");
    nav("/");
    setuser(null);
    setFavitems([]);
  };

  // --- Not Logged In State (Styled) ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-sky-950 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p className="text-xl text-gray-700 font-medium mb-4">Access Denied</p>
        <p className="text-gray-500 mb-6 text-center max-w-sm">
          Please log in to view your profile and manage your account settings.
        </p>
        <button
          // Updated from bg-teal-600/700 to bg-sky-950
          className="bg-sky-950 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-sky-800 transition duration-300"
          onClick={() => nav("/loginpage")}
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center lg:text-left">
        WELCOME BACK !
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Changed border-teal-500 to border-sky-950 */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-950"></div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-100">

          {/* User Header and Quick Stats */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6 mb-6">
            <div className="flex items-center gap-4">
              {/* User Avatar Placeholder - Changed colors to lime-100 and sky-950 */}
              <div className="w-16 h-16 bg-sky-100 text-sky-950 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-sky-950">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-sky-950">{user.name.toUpperCase()}</h2>
                <p className="text-md text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex gap-4 mt-4 sm:mt-0">
              <div
                // Bag Count - Changed to sky-950 theme
                className="flex items-center gap-2 p-3 bg-sky-50 text-sky-950 rounded-lg cursor-pointer hover:shadow-md transition"
                onClick={() => nav("/bag")}
              >
                <FaShoppingCart className="text-xl" />
                <span className="font-semibold">{bagCount} Items</span>
              </div>
              <div
                // Favorites Count - Changed to lime-500 theme
                className="flex items-center gap-2 p-3 bg-red-100 text-sky-950 rounded-lg cursor-pointer hover:shadow-md transition"
                onClick={() => nav("/favorites")}
              >
                <FaHeart className="text-xl" />
                <span className="font-semibold">{favCount} Favorites</span>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-6">

            {/* Account Actions Buttons (Grid Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">

              <button
                // My Orders - Changed to sky-950 theme
                className="flex items-center justify-center gap-2 bg-sky-950 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-sky-800 transition"
                onClick={() => nav("/orderconfirmation")}
              >
                <FaBoxOpen /> My Orders
              </button>

              <button
                // Shop More - Changed to a softer lime-500 background for a secondary action
                className="flex items-center justify-center gap-2 bg-lime-500 text-sky-950 font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-lime-600 transition"
                onClick={() => nav("/shop")}
              >
                <FaStore /> Shop More
              </button>

              <button
                // Logout - Using sky-950 for a clean look, or use a classic red-600 if you want a warning color
                // Keeping red-600 as it's the standard for 'exit' actions (feel free to change to sky-950 if preferred)
                className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:bg-red-700 transition"
                onClick={logouting}
              >
                <FaSignOutAlt /> Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profilepage;