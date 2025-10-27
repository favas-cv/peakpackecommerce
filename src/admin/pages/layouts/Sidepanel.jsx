import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Usercontext } from '../../../context/Usercontext';
import { toast } from 'react-toastify';

function Sidepanel({closeSidepanel}) {
    const nav = useNavigate();
    const {setuser} = useContext(Usercontext);

      const logouting = () => {
        localStorage.removeItem("user");
        setuser(null);
        toast.success("Logged out successfully");
        nav("/loginpage")
        closeSidepanel();
      };
  return (
       <aside className="w-64  bg-white shadow-lg flex flex-col p-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-700">Admin Panel</h1>
                <nav className="flex flex-col space-y-4 mt-6">
                    <button onClick={() =>{ nav("/admin/dashboard")
                        closeSidepanel();
                    }} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition">
                        <span>🏠</span>
                        <span>Dashboard</span>
                    </button>
                    <button onClick={() => {nav("/admin/users")
                        closeSidepanel()
                    }} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition">
                        <span>👥</span>
                        <span>Users</span>
                    </button>
                    <button onClick={() =>{ nav("/admin/products")
                        closeSidepanel();
                    }} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition">
                        <span>📦</span>
                        <span>Products</span>
                    </button>
                    <button onClick={() => {nav("/admin/orders")
                        closeSidepanel();
                    }} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition">
                        <span>🛒</span>
                        <span>Orders</span>
                    </button>
                    <button onClick={logouting}
                     className="flex items-center space-x-2 p-2 mt-auto rounded bg-red-100 text-red-700 hover:bg-red-200 transition">
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>
  )
}

export default Sidepanel