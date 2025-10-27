import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Usercontext } from './Usercontext';

export const Favoritescontext = createContext();

export function Favoritesprovider({ children }) {
  const {user} = useContext(Usercontext);

  const userid=user?user.id:null;
  const URL = `https://peakpackbackend.onrender.com/users/${userid}`;
  const [favItems, setFavitems] = useState([]);
  const [loading,setloading] = useState(true);

  // loading favorites
  
  useEffect(() => {
    if (!userid) return;
    setloading(true);
    axios.get(URL)
      .then(res => setFavitems(res.data.favorites || []))
      .catch(err => console.error('Error loading favorites', err))
      .finally(()=>setloading(false));
  }, [userid]);
 

  //adding to favorites


  const addtoFav = async (item) => {
    if (!user){
      return toast.error("please login ")
    }
    try {
      const { data: user } = await axios.get(URL);
      const exist = (user.favorites || []).find(i => i.id === item.id);
      if (!exist) {
        const updatedFavorites = [...(user.favorites || []), item];
        await axios.patch(URL, { favorites: updatedFavorites });
        setFavitems(updatedFavorites);
       toast.success("Added to favorites!", { toastId: `fav-${item.id}` });

    }else{
      toast.info('Already inside favorites');
    } }
   catch (err) {
    toast.error("Error adding to favorites: " + err.message);
}

    }


    //toggle switch

    const toggleFav = async (item) =>{
      if(!userid){
        return toast.error("please login")
      }
      try{
        const {data : user} = await axios.get(URL);
        const exist = (user.favorites || []).find(i=>i.id === item.id);
        let updatedFavorites ;
        if(exist){
          updatedFavorites=(user.favorites ||[]).filter(i=>i.id !== item.id);
        }else {
          updatedFavorites =[...(user.favorites||[]),item];
        }

        await axios.patch(URL,{favorites:updatedFavorites});
        setFavitems(updatedFavorites);
      } catch(err){
        toast.error("Error in toggleFav fn" +err.message );

      }
    }



    //removing from favorites


  const removefromFav = async (id) => {
    if (!userid) return;
    try {
      const { data: user } = await axios.get(URL);
      const updatedFavorites = (user.favorites || []).filter(i => i.id !== id);
      await axios.patch(URL, { favorites: updatedFavorites });
      setFavitems(updatedFavorites);
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };


  //clearing from favorites

  const clearFav = async () => {
    if (!userid) return;
    try {
      await axios.patch(URL, { favorites: [] });
      setFavitems([]);
    } catch (err) {
      console.error("Error clearing favorites:", err);
    }
  };

  const favCount = favItems.length;

  return (
    <Favoritescontext.Provider
     value={{ favItems,setFavitems, addtoFav, removefromFav, clearFav ,toggleFav,loading,favCount}}>
      {children}
    </Favoritescontext.Provider>
  );
}
