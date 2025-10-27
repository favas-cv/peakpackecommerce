import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-950 text-gray-300 border-t border-lime-500/30">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          {/* 1. Logo and Social Media (Takes up 2 columns on mobile) */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <Link to="/">
                <h1 className="text-3xl font-extrabold mb-3">
                    <span className="text-white">PEAK</span>
                    <span className="text-lime-500">PACK</span>
                </h1>
            </Link>
            
            <p className="text-sm text-gray-400 mb-4">Equipping your next adventure.</p>

            <div className="flex gap-4 text-xl">
              {/* Social Icons with Lime Hover */}
              <FaFacebookF className="hover:text-lime-500 cursor-pointer transition"/>
              <FaTwitter className="hover:text-lime-500 cursor-pointer transition"/>
              <FaInstagram className="hover:text-lime-500 cursor-pointer transition"/>
              <FaLinkedinIn className="hover:text-lime-500 cursor-pointer transition"/>
            </div>
          </div>
          
          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-lime-500/50 pb-1">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop" className="hover:text-lime-500 transition">Shop Now</Link></li>
              <li><Link to="/about" className="hover:text-lime-500 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-lime-500 transition">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-lime-500 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* 3. Account */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-lime-500/50 pb-1">Account</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/loginpage" className="hover:text-lime-500 transition">Login / Register</Link></li>
              <li><Link to="/profile" className="hover:text-lime-500 transition">My Profile</Link></li>
              <li><Link to="/bag" className="hover:text-lime-500 transition">View Bag</Link></li>
              <li><Link to="/orderconfirmation" className="hover:text-lime-500 transition">Track Order</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info (Simple Block) */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-lime-500/50 pb-1">Get In Touch</h4>
            <div className="space-y-2 text-gray-400 text-sm">
                <p>Email: <a href="mailto:support@peakpack.com" className="hover:text-lime-500">support@peakpack.com</a></p>
                <p>Phone: <a href="tel:+917306656998" className="hover:text-lime-500">+91 7306 656 998</a></p>
                <p>Peakpack HQ: 123 Bhat Road , Kozhikode 673638</p>
            </div>
          </div>

        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-sky-900 text-center py-4 text-gray-500 text-sm border-t border-sky-800">
        &copy; {currentYear} PeakPack. All rights reserved. Designed for Explorers.
      </div>
    </footer>
  );
}

export default Footer;