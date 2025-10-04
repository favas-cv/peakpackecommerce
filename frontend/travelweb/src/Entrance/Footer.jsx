import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">

        <div className="flex flex-col items-start">
       

          <h1 className="text-2xl font-bold mb-2">
            <span className="text-green-900">Peak</span>
            <span className="text-orange-600">Pack</span>
          </h1>
          <div className="flex gap-4 mt-2">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer transition"/>
            <FaTwitter className="hover:text-blue-400 cursor-pointer transition"/>
            <FaInstagram className="hover:text-pink-500 cursor-pointer transition"/>
            <FaLinkedinIn className="hover:text-blue-600 cursor-pointer transition"/>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:flex-1 flex justify-center">
          <ul className="flex gap-8 text-gray-400 text-sm">
            <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/loginpage" className="hover:text-white transition">Login</Link></li>
          </ul>
        </div>

      </div>

      <div className="bg-gray-800 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} PeakPack. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
