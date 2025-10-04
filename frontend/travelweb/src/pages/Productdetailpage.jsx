import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bagcontext } from '../context/Bagcontext';
import { Favoritescontext } from '../context/Favoritescontext';
import { toast } from 'react-toastify';

function ProductDetailPage() {
  const { id } = useParams();


  const [product, setProduct] = useState(null);
  const { addtoBag } = useContext(Bagcontext); 
  const { addtoFav } = useContext(Favoritescontext);

  useEffect(() => {
    axios.get(`http://localhost:8000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => toast.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-cover rounded-xl" />



        <div className="flex-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.category} | {product.season}</p>
          <p className="mt-4 text-xl font-semibold">${product.price}</p>
          <p className="mt-4">{product.description}</p>

          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => addtoBag(product)}
              className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-green-800"
            >
              Add to Bag
            </button>
            <button
              onClick={() => addtoFav(product)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
