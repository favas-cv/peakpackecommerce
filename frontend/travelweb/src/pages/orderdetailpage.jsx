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

  useEffect(() => {
    if (!user) return;

    axios.get(URL)
      .then(res => setAddresses(res.data.addresses || []))
      .catch(err => console.log(err));
  }, [user]);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };


  // save addresse

  const saveAddress = async () => {
    try {
      const updatedAddresses = [...addresses, newAddress];
      await axios.patch(URL, { addresses: updatedAddresses });

      const { data } = await axios.get(URL); 
      setAddresses(data.addresses || []);
      setNewAddress({ Fullname:"", StreetAddress:"", City_State_zip:"", Phone:"" });
      setShowForm(false);
      toast.success("✅ Address saved!");
    } catch (err) {
      toast.error("❌ Error saving address");
    }
  };

  // delete address
  const deleteAddress = async (index) => {
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      await axios.patch(URL, { addresses: updatedAddresses });

      const { data } = await axios.get(URL);
      setAddresses(data.addresses || []);
      if (selectedAddress === index) setSelectedAddress(null);
      toast.success("🗑️ Address deleted");
    } catch (err) {
      toast.error("❌ Error deleting address");
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>You are not logged in</p>
      </div>
    );
  }

  if (bagItems.length === 0) {
    return <h2 className="text-center mt-10 text-gray-500">Your bag is empty 😔</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Delivery Address</h2>

          {addresses.length > 0 && (
            <div className="space-y-3 mb-4">
              {addresses.map((addr, i) => (
                <div
                  key={i}
                  className={`border rounded p-3 cursor-pointer flex items-start justify-between ${
                    selectedAddress === i ? "border-green-600 bg-green-50" : ""
                  }`}
                  onClick={() => setSelectedAddress(i)}
                >
                  <div className="flex items-start gap-2">
                    <span>{selectedAddress === i ? "✅" : "⬜"}</span>
                    <div>
                      <p className="font-semibold">{addr.Fullname}</p>
                      <p>{addr.StreetAddress}</p>
                      <p>{addr.City_State_zip}</p>
                      <p>📞 {addr.Phone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteAddress(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              + Add New Address
            </button>
          )}

          {showForm && (
            <div className="space-y-3 mt-4">
              <input
                type="text"
                name="Fullname"
                placeholder="Full Name"
                value={newAddress.Fullname}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="StreetAddress"
                placeholder="Street Address"
                value={newAddress.StreetAddress}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="City_State_zip"
                placeholder="City, State, Zip"
                value={newAddress.City_State_zip}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="Phone"
                placeholder="Phone Number"
                value={newAddress.Phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveAddress}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Your Items</h2>
          {bagItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-3 bg-white p-2 rounded border"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="flex justify-between text-gray-600">
            <span>Subtotal:</span> <span>${Math.round(bagTotal)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Delivery:</span> <span>${charge}</span>
          </p>
          <p className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span> <span>${Math.round(subtotal)}</span>
          </p>

          <button
            disabled={selectedAddress === null}
            onClick={() => {
              if (selectedAddress === null) {
                toast.error("Please select an address");
              } else {
                nav("/checkout")

            }
            }}
            className="w-full mt-4 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition disabled:bg-gray-400"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orderdetailpage;
