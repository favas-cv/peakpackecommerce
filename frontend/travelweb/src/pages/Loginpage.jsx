import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Usercontext } from "../context/Usercontext";

function Loginpage() {
  const nav = useNavigate();
  const { user, setuser } = useContext(Usercontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  async function HandleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:8000/users?email=${email}&password=${password}`
      );


      if (res.data.length > 0) {
        const loggeduser = res.data[0];
        localStorage.setItem("user", JSON.stringify(loggeduser));
        setuser(loggeduser);

        if (loggeduser.status === "blocked") {
          toast.error("You Are blocked from admin , Sorry")
          return;

        }
        setError("");


        toast.success("Login Successful!", { toastId: "loginSuccess" });

        if (loggeduser.role === "admin") {
          toast("Welcome Admin");
          nav("/admin/dashboard");
        }
        else {
          nav("/");
          toast("welcome " + loggeduser.name)
        }
      } else {
        toast.error("Invalid user, please register", { toastId: "loginError" });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center relative">

        {/* bag */}

        <div className="relative w-70 h-93 bg-green-800 rounded-t-4xl rounded-b-2xl flex flex-col items-center pt-6">
          <div className="absolute -top-8 w-20 h-14 border-10 border-green-800 rounded-full"></div>

          <div className="absolute left-[-30px] bottom-10 w-14 h-30 bg-green-800 rounded-xl shadow-lg"></div>
          <div className="absolute right-[-30px] bottom-9 w-14 h-30 bg-green-800 rounded-xl shadow-lg"></div>

          <div
            className="w-0 h-0  border-l-[50px] border-r-[50px] border-b-[60px] border-l-transparent border-r-transparent border-b-orange-600 mb-4"
          >
          </div>


          {/* login */}

          <div className="w-57 bg-white p-5 rounded-2xl shadow-md flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-800 mb-3">Login</h1>

            {error && (
              <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
            )}

            <form className="flex flex-col w-full" onSubmit={HandleLogin}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
              <p className="text-xs text-gray-500 mb-1 text-center">
                <Link
                  to="/forgotpassword"
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Forgot password
                </Link>
              </p>

              <button
                type="submit"
                className="w-full bg-green-800 hover:bg-orange-500 text-white font-bold py-2 rounded-md transition duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Don't have an account?{" "}
              <Link
                to="/registerpage"
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <h1 className="mt-6 text-4xl font-bold">
          <span className="text-black">Peak</span>
          <span className="text-orange-500">Pack</span>
        </h1>
      </div>
    </div>
  );
}

export default Loginpage;
