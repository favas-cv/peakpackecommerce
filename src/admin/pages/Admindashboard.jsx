import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../Customhooks/Fetchinghook';
import { useNavigate } from 'react-router-dom';

import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function Admindashboard() {
    const { data: products } = useFetch('https://peakpackbackend.onrender.com/products')
    const { data: users } = useFetch('https://peakpackbackend.onrender.com/users');
    const nav = useNavigate();

    const [revenue, setRevenue] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [ordercount, setordercount] = useState();

    const [revenueData, setRevenueData] = useState([]);
    const [categorystock, setCategorystock] = useState([]);


    useEffect(() => {
        if (users && users.length > 0) {
            let totalRevenue = 0;
            let allOrders = [];

            users.forEach(user => {
                if (user.orders && user.orders.length > 0) {
                    user.orders.forEach(order => {
                        totalRevenue += order.total;
                        allOrders.push({
                            ...order,
                            userEmail: user.email,
                            userName: user.name,
                        })
                    })
                }
            });

            setRevenue(totalRevenue);
            setordercount(allOrders.length)

            allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
            setRecentOrders(allOrders.slice(0, 5));


            const groupedbydate = allOrders.reduce((revenuebydate, order) => {
                const date = order.date.split("T")[0];
                if (!revenuebydate[date]) revenuebydate[date] = 0;
                revenuebydate[date] += order.total;
                console.log(revenuebydate);
                return revenuebydate;

            }, {});

            const chartData = Object.keys(groupedbydate).map(date => ({
                date,
                revenue: groupedbydate[date]
            }));

            setRevenueData(chartData);
            console.log(chartData);
        }

    }, [users]);




    useEffect(() => {
        if (products && products.length > 0) {
            const categoryCount = {};

            products.forEach(product => {
                const category = product.category || "other";

                if (!categoryCount[category]) categoryCount[category] = 0;
                categoryCount[category] += 1;
            });

            const chartData = Object.keys(categoryCount).map(cat => ({
                category: cat,
                count: categoryCount[cat]
            }));

            console.log(chartData);


            setCategorystock(chartData);
        }
    }, [products]);



    return (
        <div className="flex min-h-screen bg-gray-100">

            <main className="flex-1 p-6 space-y-10">


                {/* totalcard */}
                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
                        <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{products.length}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
                        <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">{users.length}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
                        <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
                        <p className="text-3xl font-bold text-purple-600 mt-2">${revenue || 0}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition">
                        <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
                        <p className="text-3xl font-bold text-orange-600 mt-2">{ordercount}</p>
                    </div>
                </div>


                {/* revenue by time */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Revenue Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip formatter={(value) => `$${value}`} />
                                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>



                    {/* stock by category */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Product by Category</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categorystock}
                                    dataKey="count"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={60}
                                    fill="#8884d8"
                                    label
                                >
                                    {categorystock.map((entry, index) => {
                                        let color = "#f97316";
                                        if (entry.category === "Trekking") color = "#4ade80";
                                        else if (entry.category === "Beach-Trips") color = "#0576ffff";
                                        else if (entry.category === "Camping") color = "#dff871ff";
                                        else if (entry.category === "Electronics") color = "#ea08c8ff";
                                        else if (entry.category === "others") color = "#ea08c8ff";
                                        return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                </Pie>
                                <Tooltip formatter={(value) => `${value} products`} />

                            </PieChart>
                        </ResponsiveContainer>
                    </div>


                </div>



                {/* orders */}


                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-left text-sm font-semibold text-gray-600">
                                    <th className="p-3">User</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Total</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="p-3 font-medium">{order.userName}</td>
                                        <td className="p-3 text-gray-600">{order.userEmail}</td>
                                        <td className="p-3 font-semibold text-blue-600">${order.total}</td>
                                        <td className="p-3 text-gray-500">{order.date.split("T")[0]}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold 
                            ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                            ${order.status === "Shipped" ? "bg-blue-100 text-blue-700" : ""}
                            ${order.status === "Delivered" ? "bg-green-100 text-green-700" : ""}
                            ${order.status === "Cancelled" ? "bg-red-100 text-red-700" : ""}
                          `}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center p-4 text-gray-500">
                                            No recent orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Admindashboard
