import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Forgotpassword() {
    const URL = "https://peakpackbackend.onrender.com/users";
    const [password, setpassword] = useState("");
    const [email, setemail] = useState('');
    const [error, seterror] = useState("");
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get(`${URL}?email=${email}`)

        try {
            if (!email || !password) {
                seterror("Must fill all fields");
                return;
            }
            if (password.length < 6) {
                seterror("Password must be at least 6 characters");
                return;
            }

            if (res.data.length > 0) {
                const user = res.data[0];
                
                await axios.patch(`${URL}/${user.id}`, { password });
                nav("/loginpage")

                toast.success("password changed");


            } else {
                toast.error("verify email");
            }
        } catch (err) {
            toast.error("error in changing password" + err.message);

        }


    }

    return (
        <>
            <div className="flex p-4 min-h-screen justify-center items-center h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg p-6 rounded max-w-md w-full mx-4 ms:mx-auto"
                >
                    <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full mb-3 sm:mb-4 px-3 py-2 border rounded-md"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full mb-3 px-3 py-2 border rounded-md"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-orange-500 text-white font-bold py-2 rounded-md"
                    >
                        Reset Password
                    </button>
                </form>
            </div>


        </>)
}

export default Forgotpassword