import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bagcontext } from '../context/Bagcontext';


function Navbar() {
  const nav = useNavigate();

  return (
    <>
      <nav className="sticky top-0 z-50  backdrop-blur-md text-black px-6 py-4 flex justify-between items-center">
        <h1 
          className="text-4xl font-bold cursor-pointer"
          onClick={() => nav('/')}
        >
          <span className='text-green-900 '>Peak</span><span className='text-orange-600'>Pack</span>
        </h1>
        <ul className="flex space-x-6">
          <li><Link to="/shop" className="hover:text-orange-400">Shop</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
          <li><Link to="/favorites" className="hover:text-yellow-400">Favorites</Link></li>

          
          <li><Link to="/bag" className="hover:text-yellow-400">Bag</Link></li>

          <li><Link to="/profile" className="hover:text-yellow-400">Profile</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
