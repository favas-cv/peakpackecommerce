import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Registerpage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bag, setBag] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [addresses, setAdresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [role, setrole] = useState("user");
    const [status, setstatus] = useState("unblocked");
    const nav = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are required.")
            return;
        }

        if (name.length < 3) {
            setError('Name must be at least 3 characters.')
            return;
        }

        const Emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!Emailpattern.test(email)) {
            setError('Please enter a valid email address.')
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.')
            return;
        }

        try {
            const res = await axios.get(`https://peakpackbackend.onrender.com/users?email=${email}`);
            if (res.data.length > 0) {
                setError('Email already registered. Please login.');
                return;
            }

            const Newuser = { name, email, password, status, bag, favorites, orders, role };
            await axios.post('https://peakpackbackend.onrender.com/users', Newuser);
            toast.success('Registration successful! You can now log in.', {
                toastId: 'Registersuccess'
            });
            setError('');
            setEmail('');
            setName('');
            setPassword('');
            nav("/loginpage");

        } catch (err) {
            setError('Something went wrong during registration. Please try again.');
            console.error(err); // Log the actual error for debugging
        }
    }

    return (
        // Main container with background image
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: "url('/images/shadowbg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#c1e3b9ff' // Fallback color
            }}

        >
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">

                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src='/images/loginreglogo.jpg'
                        alt="PEAKPACK Logo"
                        className="h-35 mb-2" // Smaller height for a cleaner look
                    />
                </div>

                <h1 className="text-3xl font-extrabold text-center text-sky-950 mb-7">
                    Join the Adventure
                </h1>

                {error && (
                    <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center text-sm">
                        {error}
                    </p>
                )}

                <form onSubmit={handleRegister} className="flex flex-col space-y-5">
                    <input
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-950 focus:border-transparent placeholder-gray-500 transition duration-200 text-gray-800"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        aria-label="Full Name"
                    />
                    <input
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-950 focus:border-transparent placeholder-gray-500 transition duration-200 text-gray-800"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        aria-label="Email Address"
                    />
                    <input
                        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-950 focus:border-transparent placeholder-gray-500 transition duration-200 text-gray-800"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        aria-label="Password"
                    />

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center mt-2 mb-4">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-ssky-950 focus:ring-sky-950 border-gray-300 rounded"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 select-none">
                            I agree to the <Link href="#" className="font-medium text-sky-950 hover:text-teal-700">Terms & Conditions</Link>
                        </label>
                    </div>

                    <button
                        className="w-full bg-lime-500 hover:bg-sky-950 text-white font-bold py-3 px-5 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-6 text-center">
                    Already have an account?{' '}
                    <Link
                        to='/loginpage'
                        className="font-semibold text-sky-950 hover:text-teal-700 hover:underline transition duration-200"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Registerpage;