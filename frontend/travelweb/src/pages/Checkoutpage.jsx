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
        setTickedAddress(addresses[0] || null);
      })
      .catch(err => console.log(err));
  }, [user]);

  const placeOrder = async () => {
    if (!tickedAddress) {
      toast.error("No address selected!");
      return;
    }
    if (bagItems.length === 0) {
      toast.error("Your bag is empty!");
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
        status:"pending"
      };

      const { data } = await axios.get(URL);
      const currentOrders = data.orders || [];

      await axios.patch(URL, {
        orders: [...currentOrders, order]
      });

      clearBag();
      toast.success("✅ Order placed successfully!");
      nav("/orderconfirmation");
    } catch (err) {
      console.log(err);
      toast.error("❌ Error placing order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      {/* bag */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
        {bagItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded border">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="bg-white p-4 rounded shadow space-y-2">
          <p className="flex justify-between text-gray-600">
            <span>Subtotal:</span> <span>${(subtotal - charge).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Delivery:</span> <span>${charge.toFixed(2)}</span>
          </p>
          <p className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span> <span>${subtotal.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>
        {tickedAddress ? (
          <div className="border rounded p-3 bg-green-50">
            <p className="font-semibold">{tickedAddress.Fullname}</p>
            <p>{tickedAddress.StreetAddress}</p>
            <p>{tickedAddress.City_State_zip}</p>
            <p>📞 {tickedAddress.Phone}</p>
          </div>
        ) : (
          <p className="text-gray-500">No address available.</p>
        )}

        <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
        <select
          className="w-full border px-3 py-2 rounded"
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option value="Card">Card</option>
          <option value="Cash">Cash on Delivery</option>
          <option value="UPI">UPI</option>
        </select>

        <button
          onClick={placeOrder}
          className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkoutpage;
