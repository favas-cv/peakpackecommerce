import React, { useContext, useEffect, useState } from "react";
import { Bagcontext } from "../context/Bagcontext";
import { Usercontext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Orderconfirmationpage() {
  const nav = useNavigate();
  const { bagItems, subtotal, charge, URL, clearBag } = useContext(Bagcontext);
  const { user } = useContext(Usercontext);

  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(URL)
        .then((res) => {
          setPreviousOrders(res.data.orders || []);
        })
        .catch((err) => toast.error(err));
    }
  }, [user, URL]);

 

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">


      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Pending Order</h2>
        {bagItems.length > 0 ? (
          <>
            <div className="space-y-4">
              {bagItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

              ))}


            </div>
            <div className="bg-gray-100 p-4 rounded mt-4">
              <p className="flex justify-between text-gray-600">
                <span>Subtotal:</span> <span>${(subtotal - charge).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-gray-600">
                <span>Delivery:</span> <span>${charge.toFixed(2)}</span>
              </p>
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span> <span>${subtotal.toFixed(2)}</span>
              </p>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => nav("/orderdetailpage")}
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Checkout
                </button>
              </div>
            </div>

          </>
        ) : (
          <p>Your bag is empty 😔</p>
        )}
      </div>

      {/* orders */}



      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center ">

        <h2 className="text-4xl font-bold text-orange-600 mb-4">Previous Orders</h2>
        </div>

        {previousOrders.length > 0 ? (
          [...previousOrders].reverse().map((order, index) => (
            <div key={index} className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold">Order {previousOrders.length-index}</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-gray-600">
                  <span>Subtotal:</span> <span>${(order.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery:</span> <span>${order.delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <span>Total:</span> <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="text-gray-600 mt-2">
                  <span>Payment Method: </span>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="text-gray-600 mt-2">
                  <span>Status: </span>
                  <span>{order.status}</span>
                </div>
                <p className="text-gray-600 mt-2">Order Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>You have no previous orders.</p>
        )}

      </div>


    </div>
  );
}

export default Orderconfirmationpage;
