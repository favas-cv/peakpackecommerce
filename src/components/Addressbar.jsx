
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Addressbar({ onSave }) {
  const [error, setError] = useState(null);
  const [Address, setAddress] = useState({
    Fullname: '',
    StreetAddress: '',
    City_State_zip: '',
    Phone: ''
  });

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userid = storedUser?.id;

  function Handlechange(e) {
    setAddress({ ...Address, [e.target.name]: e.target.value });
  }

  const Submittingadress = async (e) => {
    e.preventDefault();

    if (!Address.Fullname || !Address.StreetAddress || !Address.City_State_zip || !Address.Phone) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios.patch(`https://peakpackbackend.onrender.com/users/${userid}`, { address: Address });
      
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...storedUser, address: Address };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setError(null);
      toast.success("Address saved successfully!");
      onSave();
      setAddress({
        Fullname: '',
        StreetAddress: '',
        City_State_zip: '',
        Phone: ''
      })
    } catch (err) {
      setError("Error saving address: " + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
      <form onSubmit={Submittingadress} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input name="Fullname" value={Address.Fullname} onChange={Handlechange} placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
        <input name="StreetAddress" value={Address.StreetAddress} onChange={Handlechange} placeholder="Street Address" className="w-full border px-3 py-2 rounded" />
        <input name="City_State_zip" value={Address.City_State_zip} onChange={Handlechange} placeholder="City, State, ZIP" className="w-full border px-3 py-2 rounded" />
        <input name="Phone" value={Address.Phone} onChange={Handlechange} placeholder="Phone Number" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded mt-4 font-semibold">Save Address</button>
      </form>
    </div>
  );
}
