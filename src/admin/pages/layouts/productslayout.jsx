import React, { useState, useEffect } from "react";
import useFetch from "../../../Customhooks/Fetchinghook";
import axios from "axios";
import { toast } from "react-toastify";

function Productslayout() {
    const URL = "https://peakpackbackend.onrender.com";
    const { data: products, loading, error } = useFetch(`${URL}/products`);

    const [productsList, setProductsList] = useState([]);
    const [newproduct, setNewproduct] = useState({
        name: "",
        price: "",
        category: "",
        season: "",
        image: "",
        description:""
    });
    const [editingproduct, seteditingproduct] = useState(null);
    const [showform, setshowform] = useState(false);
    const [formerror, setformerror] = useState(null);


    useEffect(() => {
        if (products) setProductsList(products);
    }, [products]);



    const handleChange = (e) => {
        setNewproduct({ ...newproduct, [e.target.name]: e.target.value });
    };


//add and edit

    const handleAdd = async (e) => {
        e.preventDefault();
        if (
            !newproduct.name ||
            !newproduct.price ||
            !newproduct.category ||
            !newproduct.season ||
            !newproduct.image
        ) {
            setformerror("must fill all fields !");
            return;
        }

        setformerror(null);

        try {
            if (editingproduct) {
                await axios.patch(`${URL}/${editingproduct}`, newproduct);
                toast.success("edited succesfull", { toastId: "edited" });
                setProductsList(productsList.map(p => p.id === editingproduct ? newproduct : p));
                seteditingproduct(null);

            } else {

                const res = await axios.post(URL, newproduct);
                setProductsList([res.data, ...productsList]); 
                toast.success("Product added successfully!");
            }
            setNewproduct({ name: "", price: "", category: "", season: "", image: "" ,description:""});
        } catch (err) {
            toast.error("Error adding product: " + err.message);
        }
    };

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/${id}`);
            setProductsList(productsList.filter(p => p.id !== id));
            toast.success("Product deleted successfully!");
        } catch (err) {
            toast.error("Error deleting product:", err);
        }
    };

    const handleEdit = (product) => {
        setNewproduct(product);     
        seteditingproduct(product.id);
        setshowform(true);
    };

    const handlecancell = () => {
        setshowform(false)
        seteditingproduct(null);
    };

    const handleAddClick = () => {
        setNewproduct({ name: "", price: "", category: "", season: "", image: "" });
        seteditingproduct(null); 
        setshowform(true);    
    };




    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen gap-4">
                <div className="relative w-20 h-20">
                    <div className="absolute w-full h-full border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-green-800 text-lg font-semibold animate-pulse">
                    Please wait,products are loading...
                </p>
            </div>
        );
    }


    if (error) return <p className="text-red-500">Error loading products</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-center mb-7">
                <h1 className="text-4xl font-bold text-orange-600 mb-4">Products</h1>

            </div>
            <div className="flex justify-center mb-5 ">

                <button
                    onClick={handleAddClick}
                    className="bg-green-700  text-white px-4 py-2 justify-center rounded-md hover:bg-green-800">
                    Add Product
                </button>

            </div>
            {showform && (
                <form onSubmit={handleAdd} className="flex flex-col gap-3 p-4 bg-white rounded shadow mb-6">
                    <h2 className="text-xl font-bold">Add New Product</h2>
                    {formerror && <p className="text-red-500 font-bold mb-2 text-center">{formerror}</p>}
                    <input type="text" name="name" value={newproduct.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
                    <input type="number" name="price" value={newproduct.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
                    <input type="text" name="category" value={newproduct.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" />
                    <input type="text" name="season" value={newproduct.season} onChange={handleChange} placeholder="Season" className="border p-2 rounded" />
                    <input type="text" name="image" value={newproduct.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded" />
                    <input type="text" name="description" value={newproduct.description} onChange={handleChange} placeholder="Product Description" className="border p-2 rounded" />
                    <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                        {editingproduct ? "Update the Product" : "Add the product"}
                    </button>
                    <button onClick={handlecancell} className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-150">Cancell</button>

                </form>)}






            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-600">
                            <th className="p-3">#</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Category</th>
                            <th className="p-3 text-center">Change Me</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList.length > 0 ? productsList.map((product, i) => (
                            <tr key={product.id || i} className="border-b hover:bg-gray-50 text-sm">
                                <td className="p-3">{i + 1}</td>
                                <td className="p-3">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md border" />
                                </td>
                                <td className="p-3 font-medium">{product.name}</td>
                                <td className="p-3 text-green-600 font-semibold">${product.price}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3 text-center space-x-2">
                                    <button onClick={() => handleEdit(product)} className="bg-orange-300 text-white px-3 py-1 rounded hover:bg-orange-600">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-300 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productslayout;
