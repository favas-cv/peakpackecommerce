import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Usercontext } from './Usercontext';

export const Bagcontext = createContext();

export function Bagprovider({ children }) {
  const { user } = useContext(Usercontext);

  const userid = user ? user.id : null;
  const URL = userid ? `https://peakpackbackend.onrender.com/users/${userid}` : null;
  const [bagItems, setBagitems] = useState([]);
  const [loading, setloading] = useState(true);


  //placeorder



  // showing bag

  useEffect(() => {
    if (!userid) return;
    setloading(true);
    axios.get(URL)
      .then(res => setBagitems(res.data.bag || []))
      .catch(err => console.log(err))
      .finally(() => setloading(false));
  }, [userid]);

  // adding to bag

  const addtoBag = async (item) => {

    if (!userid) {
      return toast.error("please login ")
    }
    try {
      const { data: user } = await axios.get(URL);
      const exist = (user.bag || []).find(i => i.id === item.id);

      let updatedBag;
      if (exist) {

        toast.info("Item is already inside the bag", { toastId: `bag-${item.id}` });
        return;

      } else {

        updatedBag = [...(user.bag || []), { ...item, quantity: 1 }];
      }

      await axios.patch(URL, { bag: updatedBag });
      setBagitems(updatedBag);

      
      toast.success(`${item.name} added to bag!`, {
        toastId: `bag-${item.id}`});


    } catch (err) {
      toast.error("Error in adding: " + err);
    }
  };

  //removing from bag

  const removefromBag = async (item) => {
    try {
      const { data: user } = await axios.get(URL);
      const exist = (user.bag || []).find(i => i.id === item.id);

      let updatedBag;
      if (exist) {
        updatedBag = user.bag.filter(i => i.id !== item.id);
      } else {
        updatedBag = user.bag || [];
      }

      await axios.patch(URL, { bag: updatedBag });
      setBagitems(updatedBag);
      toast.success(`${item.name} is removed from bag`, { toastId: `remove-${item.id}` });

    } catch (err) {
      toast.error("Error in removing: " + err);
    }
  };

  //increase quantity

  const increaseQuantity = async (id) => {
    try {
      const { data: user } = await axios.get(URL);

      let updatedBag = (user.bag || []).map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      await axios.patch(URL, { bag: updatedBag });
      setBagitems(updatedBag);
    } catch (err) {
      toast.error("Error in increment: " + err);
    }
  };

  // decrease quantity


  const decreaseQuantity = async (id) => {
    try {
      const { data: user } = await axios.get(URL);

      let updatedBag = (user.bag || []).map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );

      await axios.patch(URL, { bag: updatedBag });
      setBagitems(updatedBag);
    } catch (err) {
      toast.error("Error in decrement: " + err);
    }
  };

  // clearing the bag

  const clearBag = async () => {
    await axios.patch(URL, { bag: [] });
    setBagitems([]);
  };

  // bag count

  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);

  // total price

  const bagTotal = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //delivery charge

  const charge = bagTotal >= 500 ? 0 : 40;

  //subtotal prioce

  const subtotal = charge + Math.round(bagTotal);


  return (
    <Bagcontext.Provider
      value={{
        bagItems,
        bagCount,
        addtoBag,
        removefromBag,
        decreaseQuantity,
        increaseQuantity,
        clearBag,
        bagTotal,
        subtotal,
        charge,
        URL,
        loading

      }}
    >
      {children}
    </Bagcontext.Provider>
  );
}
