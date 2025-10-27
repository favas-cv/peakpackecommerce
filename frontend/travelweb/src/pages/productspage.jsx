import React, { useContext, useEffect, useState } from 'react'
import Filteringnavbar from '../components/Filteringnavbar';
import axios from 'axios';
import useFetch from '../Customhooks/Fetchinghook';
import { Bagcontext } from '../context/Bagcontext';
import { Favoritescontext, Favoritesprovider } from '../context/Favoritescontext';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function Productspage() {

  const { data: products, error, loading } = useFetch('http://localhost:8000/products');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const herocategory = params.get("category");
  const heroseason = params.get("season");
  const heroname = params.get("name");

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [sortOption, setSortOption] = useState('None');

  const { bagItems, addtoBag, removeFromBag, increaseQuantity, decreaseQuantity, bagTotal } = useContext(Bagcontext);
  const { favItems, addtoFav, toggleFav } = useContext(Favoritescontext);
  const nav = useNavigate();

  useEffect(() => {
    if (herocategory) {
      setSelectedCategory(herocategory);
      setSearchTerm('');
      setSelectedSeason("All")
    } else if (heroseason) {
      setSelectedSeason(heroseason);
      setSearchTerm('');
      setSelectedCategory("All");
    } else if (heroname) {
      setSearchTerm(heroname);
      setSelectedCategory("All");
      setSelectedSeason("All");
    }
  }, [herocategory, heroseason, heroname])

  useEffect(() => {
    if (!products) return;
    let filtered = [...products]

    // filteriing by category



    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    };


    //filtering by season
    if (selectedSeason !== 'All') {
      filtered = filtered.filter(p => p.season === selectedSeason)
    };


    //filter by search

    if (searchTerm !== '') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }


    //sorting

    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-a-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-z-a') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setDisplayedProducts(filtered);

  }, [products, selectedCategory, selectedSeason, searchTerm, sortOption]);


  
if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-800"></div>
        <p className="text-green-800 text-lg font-semibold animate-pulse mt-2">
          Please wait, your products are loading...
        </p>
      </div>
    </div>
  );
}




  return (
    
    
    <>

           <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/images/shadowbg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#c1e3b9ff' // Fallback color
      }}

    >
    


      <Filteringnavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />


      {/*ad*/}

{/* season */}

      {selectedSeason === 'Winter' && selectedCategory==='All'  && <img src='/images/winterhero1.jpg' />}
      {selectedSeason === 'Summer'  && selectedCategory==='All' && <img src='/images/summerhero.png' />}
      {selectedSeason === 'Rainy'  && selectedCategory==='All' && <img src='/images/rainyhero.png' />}

    

{/* category */}
      {selectedCategory === 'All' && selectedSeason==="All" && <img 
      onClick={()=>nav("/shop?category=Camping")}
      src='/images/campinghero.jpg' />}

      {selectedCategory === 'Camping' && <img src='/images/campinghero.jpg' />}
      {selectedCategory === 'Trekking' && <img src='/images/trekkinghero.png' />}
      {selectedCategory === 'Beach-Trips'&& <img src='/images/beachhero3.jpg' />}
      {selectedCategory === 'Rainy'&& <img src='/images/rainyhero.png' />}
      {selectedCategory === 'Electronics'&& <img src='/images/gadgethero.png' />}



      {/*products*/}

     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
    {displayedProducts.map((product) => (
      <div
        key={product.id}
        className="relative bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl transition duration-300 hover:scale-[1.03] overflow-hidden cursor-pointer border border-gray-100"
        onClick={() => nav(`/shop/${product.id}`)}
      >
        <button
          className="absolute top-3 right-3 z-10 p-1 bg-white rounded-full shadow-md hover:shadow-lg transition"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(product);
          }}
        >
          {favItems.find(f => f.id === product.id) ? (
            <AiFillHeart className="text-red-500 text-xl" />
          ) : (
            <AiOutlineHeart className="text-sky-950 text-xl" /> 
          )}
        </button>

        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate text-sky-950 mb-1">{product.name}</h3>
          <p className="text-gray-500 text-xs font-light">
            {product.category} | {product.season}
          </p>
          
          <p className="mt-2 font-extrabold text-xl text-sky-950">${product.price}</p>

          <button
            onClick={(e) => { e.stopPropagation(); addtoBag(product); }}
            className="mt-3 w-full bg-lime-500 text-sky-950 text-sm font-bold py-2 rounded-lg hover:bg-lime-600 transition shadow-md"
          >
            Add to Bag
          </button>
        </div>
      </div>
    ))}
</div>
</div>

    </>)
}

export default Productspage