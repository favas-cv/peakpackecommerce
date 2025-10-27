import React, { useContext, useState, useEffect } from "react";
import { Bagcontext } from "../context/Bagcontext";
import { Usercontext } from "../context/Usercontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkoutpage() {
  const nav = useNavigate();
  const { user } = useContext(Usercontext);
  const { bagItems, subtotal, charge, URL, clearBag } = useContext(Bagcontext);

  const [tickedAddress, setTickedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Card");

  useEffect(() => {
    if (!user) return;

    axios.get(URL)
      .then(res => {
        const addresses = res.data.addresses || [];
        const selected = JSON.parse(localStorage.getItem("selectedAddress"));
        // Find the matching address from the fetched list to ensure it's valid
        const validSelectedAddress = addresses.find(
          addr => JSON.stringify(addr) === JSON.stringify(selected)
        );
        setTickedAddress(validSelectedAddress || addresses[0] || null);
      })
      .catch(err => console.log(err));
  }, [user]);

  const placeOrder = async () => {
    if (!tickedAddress) {
      toast.error("No address selected! Please go back and select one.");
      return;
    }
    if (bagItems.length === 0) {
      toast.error("Your bag is empty! Please add items before placing an order.");
      return;
    }

    try {
      const order = {
        items: bagItems,
        subtotal: subtotal - charge,
        delivery: charge,
        total: subtotal,
        paymentMethod,
        date: new Date().toISOString(),
        address: tickedAddress,
        status: "pending"
      };

      const { data } = await axios.get(URL);
      const currentOrders = data.orders || [];

      await axios.patch(URL, {
        orders: [...currentOrders, order]
      });

      clearBag();
      localStorage.removeItem("selectedAddress");
      toast.success("✅ Order placed successfully!");
      nav("/orderconfirmation");
    } catch (err) {
      console.log(err);
      toast.error("❌ Error placing order");
    }
  };

  // --- Not Logged In State (Styled) ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <p className="text-xl text-gray-700 font-medium mb-4">You must be logged in to proceed to checkout.</p>
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
        <h2 className="text-3xl font-bold text-gray-700 mb-3">Your Bag is Empty!</h2>
        <p className="text-lg text-gray-500 text-center max-w-md">
          Add items to your bag before proceeding to checkout.
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


  // --- Main Checkout Content (Styled) ---
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center lg:text-left">Final Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT COLUMN: Order Items & Summary */}
        <div className="space-y-8">
          {/* Order Items Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">Order Items ({bagItems.length})</h2>
            {bagItems.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-contain border border-gray-200" />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <p className="flex justify-between text-gray-700">
                <span>Subtotal ({bagItems.length} items):</span>
                <span className="font-semibold">${(subtotal - charge).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-700">
                <span>Delivery Charge:</span>
                <span className="font-semibold">${charge.toFixed(2)}</span>
              </p>
              <hr className="border-gray-200" />
              <p className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Delivery Address & Payment Method */}
        <div className="space-y-8">
          {/* Delivery Address Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">Delivery Address</h2>
            {tickedAddress ? (
              <div className="border-2 border-sky-950 bg-sky-50 p-4 rounded-xl shadow-sm">
                <p className="font-bold text-lg text-gray-800">{tickedAddress.Fullname}</p>
                <p className="text-gray-700">{tickedAddress.StreetAddress}</p>
                <p className="text-sm text-gray-600">{tickedAddress.City_State_zip}</p>
                <p className="mt-2 font-medium text-gray-700">📞 {tickedAddress.Phone}</p>
              </div>
            ) : (
              <div className="bg-red-50 border-red-300 border p-4 rounded-xl text-red-700 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="font-medium">No address selected. Please go back to Order Details to choose one.</p>
                <button
                  onClick={() => nav('/orderdetailpage')}
                  className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
                >
                  Select Address
                </button>
              </div>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-3">Payment Method</h2>
            <div className="relative">
              <select
                className="block w-full border border-gray-300 bg-white py-3 px-4 pr-8 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition-all appearance-none"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="Card">Card Payment</option>
                <option value="Cash">Cash on Delivery</option>
                <option value="UPI">UPI Payment</option>
              </select>
              {/* Custom arrow for select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Place Order Button (sticky on larger screens) */}
          <div className="sticky bottom-4 md:bottom-auto md:top-auto z-10 bg-gray-50 md:bg-transparent pt-4 pb-2 md:py-0">
            <button
              onClick={placeOrder}
              disabled={!tickedAddress || bagItems.length === 0}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg transition shadow-md
                ${(!tickedAddress || bagItems.length === 0)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-sky-950 shadow-sky-900/50"
                }`}
            >
              Place Order Now
            </button>
            {(!tickedAddress || bagItems.length === 0) && (
              <p className="text-red-500 text-sm mt-2 text-center">
                *Ensure an address is selected and your bag is not empty.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkoutpage;