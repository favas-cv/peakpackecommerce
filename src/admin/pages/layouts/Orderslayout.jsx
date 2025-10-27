import React, { useEffect, useState } from "react";
import useFetch from "../../../Customhooks/Fetchinghook";
import axios from "axios";
import { toast } from "react-toastify";

function Orderslayout() {
  const URL = "https://peakpackbackend.onrender.com";

  const { data: users ,loading,error} = useFetch(`${URL}/users`);
  const [orderslist, setOrderslist] = useState([]);

  useEffect(() => {
    if (users && users.length > 0) {
      let allorders = [];
      users.forEach((user) => {
        if (user.orders && user.orders.length > 0) {
          user.orders.forEach((order) => {
            allorders.push({
              ...order,
              userEmail: user.email,
              userName: user.name,
              userId: user.id,   
              userOrders: user.orders,
              status: order.status || "Pending",
            });
          });
        }
      });


      allorders.sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrderslist(allorders);
    }
  }, [users]);




 const handleStatusChange = async (order, newStatus) => {
  try {
    setOrderslist(prev =>
      prev.map(o =>
        o.date === order.date && o.userEmail === order.userEmail
          ? { ...o, status: newStatus }
          : o
      )
    );

    const updatedOrders = order.userOrders.map(o =>
      o.date === order.date ? { ...o, status: newStatus } : o
    );

    await axios.patch(`${URL}/users/${order.userId}`, {
      orders: updatedOrders,
    });

    toast.success(`Order marked as ${newStatus}`);
  } catch (err) {
    toast.error("Failed to update status: " + err.message);
  }
};


  if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="relative w-20 h-20">
        <div className="absolute w-full h-full border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-green-800 text-lg font-semibold animate-pulse">
        Please wait, orders are loading...
      </p>
    </div>
  );
}

console.log(orderslist);


  return (
    <>
 





      <div className="flex justify-center mb-7">

        <h1 className="text-4xl text-orange-600 font-bold mb-4">All Orders</h1>
      </div>

      <ul className="space-y-4">
        {orderslist.map((order, i) => (
          <li key={i} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">
                Name: {order.userName}<br /> Email: {order.userEmail}
              </h2>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order, e.target.value)}
                className="px-2 py-1 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <p className="text-sm text-gray-500">
              Date: {order.date ? new Date(order.date).toLocaleString() : "N/A"}
            </p>

            <ul className="mt-2 space-y-1">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>
                    {item.name} (x{item.quantity}) - ${item.price}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-2 font-medium">Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Orderslayout;
