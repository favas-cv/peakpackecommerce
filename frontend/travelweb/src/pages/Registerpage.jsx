import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Registerpage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bag,setBag] = useState([]);
    const [favorites,setFavorites] = useState([]);
    const [addresses,setAdresses] = useState([]);
    const [orders,setOrders] = useState([]);
    const [error, setError] = useState('');
    const [role,setrole] = useState("user");
    const [status,setstatus] = useState("unblocked");

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required.")
            return;
        }


        if (name.length < 3) {
            setError('Name must be atleast 3 characters.')
            return;

        }


        const Emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!Emailpattern.test(email)) {
            setError('Please enter valid email address.')
            return;
        }

        if (password.length < 6) {
            setError('Password must be atleast 6 characters.')
            return;

        }




        try {
            const res = await axios.get(`http://localhost:8000/users?email=${email}`);
            if (res.data.length > 0) {
                setError('Email already registered, Please login ')
                return;
            }

            const Newuser = { name, email, password ,status,bag,favorites ,orders,role };
            await axios.post('http://localhost:8000/users', Newuser);
            toast.success('Registration succesful', {
                toastId: 'Registersuccess'
            })
            setError('');
            setEmail('');
            setName('');
            setPassword('');

        } catch (err) {
            setError('something went wrong');
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleRegister} className="flex flex-col">
                    <input
                        className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                    <input
                        className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                    />
                    <input
                        className="w-full px-4 py-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button
                        className="w-full bg-green-800 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                        type="submit"

                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account?{' '}
                    <Link to='/loginpage'
                        className="text-orange-500 hover:underline cursor-pointer"
                    >Login
                    </Link>

                </p>
            </div>
        </div>
    );

}

export default Registerpage;
