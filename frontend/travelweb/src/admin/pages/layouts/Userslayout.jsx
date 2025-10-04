import React, { useEffect, useState } from 'react'
import useFetch from '../../../Customhooks/Fetchinghook'
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

function Userslayout() {
    const { data: users, loading, error } = useFetch("http://localhost:8000/users");
    const [userlist, setuserlist] = useState([]);
    const URL = "http://localhost:8000/users";
    const [newuser, setnewuser] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });
    const [editinguser, seteditinguser] = useState(null);

    useEffect(() => {
        if (users) setuserlist(users);
    }, [users]);

    function handleChange(e) {
        setnewuser({ ...newuser, [e.target.name]: e.target.value });
    }


    
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!editinguser) return toast.error("no user selected");
        try {
            const updateduser = { ...newuser };
            await axios.patch(`${URL}/${editinguser}`, updateduser);
            setuserlist(userlist.map(u => u.id === editinguser ? updateduser : u));
            toast.success("user updated succesfull");
            seteditinguser(null);
            setnewuser({ name: "", email: "", role: "" })
        } catch (err) {
            toast.error("error occured in  updating user" + err.message)
        }
    };

    const handleEditclick = (user) => {
        seteditinguser(user.id);
        setnewuser({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        })
    };

    const handlecancell = () => {
        seteditinguser(null);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`)
            setuserlist(userlist.filter(p => p.id !== id))
            toast.success("deleted succesfull")
        } catch (err) {
            toast.error("error occured " + err);
        }
    };

    const handleBlock = async (user) => {
        try {
            const updateduser = { ...user, status: user.status === "blocked" ? "unblocked" : "blocked" };
            await axios.patch(`${URL}/${user.id}`, updateduser);
            setuserlist(userlist.map(u => u.id === user.id ? updateduser : u));
            toast.success(`user ${updateduser.status === "blocked" ? "blocked" : "unblocked"} succesfully`)
        } catch (err) {
            toast.error("error occured in " + err.message)
        }
    };


    if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="relative w-20 h-20">
        <div className="absolute w-full h-full border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-green-800 text-lg font-semibold animate-pulse">
        Please wait, your users are loading...
      </p>
    </div>
  );
}

    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex justify-center mb-7">

                    <h1 className="text-4xl font-bold text-orange-600 mb-4">users</h1>
                </div>

                {editinguser && (
                    <form onSubmit={handleEdit} className="flex flex-col gap-4 p-5 bg-gray-50 rounded-lg shadow-md mb-6 w-full max-w-md mx-auto">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">edit user</h2>
                        <input type="text" name="name" value={newuser.name} onChange={handleChange} placeholder="Name"
                         className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

                        <input type="email" name="email" value={newuser.email} onChange={handleChange} placeholder="Email" 
                        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

                        <input type="text" name="role" value={newuser.role} onChange={handleChange} placeholder="Role" 
                        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">
                            edit user
                        </button>
                        <button onClick={handlecancell}
                         className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-150">Cancell</button>


                    </form>)}

                <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-600">
                                <th className='p-3 '>#</th>
                                <th className='p-3 '>Name</th>
                                <th className='p-3 '>Email</th>
                                <th className='p-3 '>Role</th>
                                <th className='p-3 '>Status</th>
                                <th className='p-3 text-center '>Change Me</th>
                            </tr>


                        </thead>
                        <tbody>
                            {userlist.length > 0 ? userlist.map((user, i) => (
                                <tr key={i} className="border-b hover:bg-gray-50 text-sm">
                                    <td className='p-3'>{i + 1}</td>
                                    <td className='p-3 font-medium'>{user.name}</td>
                                    <td className='p-3'>{user.email}</td>
                                    <td className='p-3'>{user.role}</td>
                                    <td className='p-3'>{user.status}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button onClick={() => handleEditclick(user)} 
                                        className="bg-yellow-300 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition-all duration-150">Edit</button>

                                        <button onClick={() => handleDelete(user.id)} 
                                        className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-150">Delete</button>
                                        
                                        <button onClick={() => handleBlock(user)}
                                         className={`px-3 py-1 rounded-md  text-white transition-all duration-150 ${user.status === "blocked" ? "bg-green-400 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-700"}`}>
                                            {user.status === "blocked" ? "Unblock" : "Block"}
                                        </button>
                                    </td>
                                </tr>
                            )):(
                                <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">No Users found</td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>


{/* 
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userlist.map((user, i) => (
                        <li key={i} className='border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center bg-white'>
                            <div className="mb-3 md:mb-0">
                                <p className="text-gray-700 font-medium">Name: <span className="font-normal">{user.name}</span></p>
                                <p className="text-gray-700 font-medium">email: <span className="font-normal">{user.email}</span></p>
                                <p className="text-gray-700 font-medium">role: <span className="font-normal">{user.role}</span></p>
                                <p className="text-gray-700 font-medium">status: <span className="font-normal">{user.status}</span></p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleEditclick(user)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-all duration-150">Edit</button>
                                <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all duration-150">Delete</button>
                                <button onClick={() => handleBlock(user)} className={`px-3 py-1 rounded-md text-white transition-all duration-150 ${user.status === "blocked" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}`}>
                                    {user.status === "blocked" ? "Unblock" : "Block"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul> */}
            </div>
        </>
    )
}

export default Userslayout
