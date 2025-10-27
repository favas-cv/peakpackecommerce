import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Navbar() {
  const nav = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md h-16 text-black px-6 py-4 flex justify-between items-center">
      
      {/* Left: Brand name (desktop) / logo (mobile) */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => nav("/")}
      >
        {/* Desktop name */}
        <h1 className="text-4xl font-bold hidden md:block">
          <span className="text-sky-950">Peak</span>
          <span className="text-lime-500">Pack</span>
        </h1>

        {/* Mobile logo */}
        <img
          src="/images/peakicon.png" // 👈 your logo image path
          alt="PeakPack Logo"
          className=" w-16 md:hidden"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        <li><Link to="/shop" className="hover:text-orange-800">Shop</Link></li>
        <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
        <li><Link to="/favorites" className="hover:text-red-500">Favorites</Link></li>
        <li><Link to="/bag" className="hover:text-green-700">Bag</Link></li>
        <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
      </ul>

      {/* Mobile Menu (Icons Only) */}
      <ul className="flex md:hidden space-x-6 items-center">
        <li>
          <Link to="/shop" title="Shop">
            <img src="/images/store (1).png" alt="Shop" className="w-6 h-6 hover:opacity-70" />
          </Link>
        </li>
        <li>
          <Link to="/about" title="About">
            <img src="/images/map.png" alt="About" className="w-6 h-6 hover:opacity-70" />
          </Link>
        </li>
        <li>
          <Link to="/favorites" title="Favorites">
            <img src="/images/bookmark (1).png" alt="About" className="w-6 h-6 hover:opacity-70" />

          </Link>
        </li>
        <li>
          <Link to="/bag" title="Bag">
            <img src="/images/backpacking.png" alt="Bag" className="w-6 h-6 hover:opacity-70" />
          </Link>
        </li>
        <li>
          <Link to="/profile" title="Profile">
            <img src="/images/climber.png" alt="Profile" className="w-6 h-6 hover:opacity-70" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
