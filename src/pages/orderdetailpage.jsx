import React, { useContext, useState, useEffect } from "react";
import { Bagcontext } from "../context/Bagcontext";
import { Usercontext } from "../context/Usercontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Orderdetailpage() {
  const nav = useNavigate();
  const { user } = useContext(Usercontext);
  const { bagItems, bagTotal, subtotal, charge, URL } = useContext(Bagcontext);

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    Fullname: "",
    StreetAddress: "",
    City_State_zip: "",
    Phone: ""
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    if (!user) return;

    // Fetch addresses for the logged-in user
    axios.get(URL)
      .then(res => setAddresses(res.data.addresses || []))
      .catch(err => console.log(err));
  }, [user]);

  // Handle input changes for the new address form
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    // Clear error for the current field as user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    if (!newAddress.Fullname.trim()) newErrors.Fullname = "Full name is required.";
    if (!newAddress.StreetAddress.trim()) newErrors.StreetAddress = "Street address is required.";
    if (!newAddress.City_State_zip.trim()) newErrors.City_State_zip = "City, State, Zip is required.";
    if (!newAddress.Phone.trim()) {
      newErrors.Phone = "Phone number is required.";
    } else if (!/^\d+$/.test(newAddress.Phone.trim())) { // Basic check for digits only
      newErrors.Phone = "Phone number must contain only digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const saveAddress = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return; // Stop if validation fails
    }

    try {
      const updatedAddresses = [...addresses, newAddress];
      await axios.patch(URL, { addresses: updatedAddresses });

      const { data } = await axios.get(URL);
      setAddresses(data.addresses || []);
      setNewAddress({ Fullname: "", StreetAddress: "", City_State_zip: "", Phone: "" });
      setErrors({}); // Clear errors on successful save
      setShowForm(false);
      toast.success("✅ Address saved!");
    } catch (err) {
      toast.error("❌ Error saving address");
    }
  };

  const deleteAddress = async (index) => {
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      await axios.patch(URL, { addresses: updatedAddresses });

      const { data } = await axios.get(URL);
      setAddresses(data.addresses || []);
      if (selectedAddress === index) {
        setSelectedAddress(null);
        localStorage.removeItem("selectedAddress"); // clear if deleted
      }
      toast.success("🗑️ Address deleted");
    } catch (err) {
      toast.error("❌ Error deleting address");
    }
  };

  // --- Not Logged In State (Styled) ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <p className="text-xl text-gray-700 font-medium mb-4">You must be logged in to place an order.</p>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={() => nav("/loginpage")}
        >
          Login Now
        </button>
      </div>
    );
  }

  // --- Empty Bag State (Styled) ---
  if (bagItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-white p-4">
        <div className="w-64 h-64 mb-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-full h-full text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-700 mb-3">Can't Checkout: Bag is Empty!</h2>
        <p className="text-lg text-gray-500 text-center max-w-md">
          Please add items to your bag before proceeding to order details.
        </p>
        <button
          onClick={() => nav('/')}
          className="mt-8 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // --- Main Content (Styled) ---
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center lg:text-left">Checkout Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Delivery Address & Order Summary Preview (md:col-span-2) */}
        <div className="md:col-span-2 space-y-8">
          
          {/* 1. Delivery Address Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">1. Select Delivery Address</h2>

            {/* Existing Addresses List */}
            {addresses.length > 0 && (
              <div className="space-y-4 mb-6">
                {addresses.map((addr, i) => (
                  <div
                    key={i}
                    className={`border-2 rounded-xl p-4 cursor-pointer flex items-start justify-between transition-all duration-200 
                      ${selectedAddress === i 
                        ? "border-sky-950 bg-sky-50 shadow-md" 
                        : "border-gray-200 hover:shadow-sm"
                      }`}
                    onClick={() => {
                      setSelectedAddress(i);
                      localStorage.setItem("selectedAddress", JSON.stringify(addr));
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Custom Radio Button/Indicator */}
                      <span className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 flex items-center justify-center ${
                        selectedAddress === i ? "border-sky-950 bg-sky-950" : "border-gray-400"
                      }`}>
                         {selectedAddress === i && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </span>
                      
                      {/* Address Details */}
                      <div className="text-gray-700">
                        <p className="font-bold text-lg">{addr.Fullname}</p>
                        <p>{addr.StreetAddress}</p>
                        <p className="text-sm text-gray-500">{addr.City_State_zip}</p>
                        <p className="mt-1 font-medium">📞 {addr.Phone}</p>
                      </div>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent selection when deleting
                        deleteAddress(i);
                      }}
                      className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition"
                      aria-label="Delete address"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Address Button */}
            {!showForm && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setErrors({}); // Clear any previous errors when opening form
                }}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 transition w-full justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Address
              </button>
            )}

            {/* Address Form */}
            {showForm && (
              <div className="space-y-4 mt-6 p-4 border rounded-xl bg-gray-50">
                <div>
                  <input
                    type="text"
                    name="Fullname"
                    placeholder="Full Name"
                    value={newAddress.Fullname}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition ${errors.Fullname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.Fullname && <p className="text-red-500 text-sm mt-1">{errors.Fullname}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="StreetAddress"
                    placeholder="Street Address"
                    value={newAddress.StreetAddress}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition ${errors.StreetAddress ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.StreetAddress && <p className="text-red-500 text-sm mt-1">{errors.StreetAddress}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="City_State_zip"
                    placeholder="City, State, Zip"
                    value={newAddress.City_State_zip}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition ${errors.City_State_zip ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.City_State_zip && <p className="text-red-500 text-sm mt-1">{errors.City_State_zip}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="Phone"
                    placeholder="Phone Number"
                    value={newAddress.Phone}
                    onChange={handleChange}
                    className={`w-full border px-4 py-2 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition ${errors.Phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.Phone && <p className="text-red-500 text-sm mt-1">{errors.Phone}</p>}
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={saveAddress}
                    className="flex-1 bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition shadow-md"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setErrors({}); // Clear errors when canceling form
                      setNewAddress({ Fullname: "", StreetAddress: "", City_State_zip: "", Phone: "" }); // Also clear form fields
                    }}
                    className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 2. Items List Preview */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">2. Order Items ({bagItems.length})</h2>
            
            {bagItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-contain border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">${subtotal}</p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Final Summary & Action Button (md:col-span-1) */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <p className="flex justify-between text-gray-700">
                <span>Subtotal ({bagItems.length} items):</span>
                <span className="font-semibold">${Math.round(bagTotal)}</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>Delivery Charge:</span> 
                <span className="font-semibold">${charge}</span>
              </p>
              <hr className="border-gray-200"/>
              <p className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total:</span> 
                <span>${Math.round(subtotal)}</span>
              </p>
            </div>

            <button
              disabled={selectedAddress === null}
              onClick={() => {
                if (selectedAddress === null) {
                  toast.error("Please select a delivery address.");
                } else {
                  nav("/checkout");
                }
              }}
              className={`w-full mt-4 py-3 rounded-lg text-white font-bold transition shadow-md
                ${selectedAddress === null 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-lime-500 hover:bg-sky-950 shadow-teal-300/50"
                }`}
            >
              Proceed to Payment
            </button>
            
            {selectedAddress === null && (
              <p className="text-red-500 text-sm mt-2 text-center">
                *Please select an address to proceed.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orderdetailpage;