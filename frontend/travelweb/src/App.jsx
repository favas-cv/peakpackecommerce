import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import { ToastContainer } from 'react-toastify';
import Navbar from './Entrance/Navbar';
import Hero from './Entrance/Herosection';
import Productspage from './pages/productspage';
import Bagpage from './pages/Bagpage';


import { Bagprovider } from './context/Bagcontext';
import Favoritespage from './pages/Favoritespage';
import { Favoritesprovider } from './context/Favoritescontext';
import About from './pages/Aboutpage';
import Profile from './pages/Profilepage';
import Checkoutpage from './pages/Checkoutpage';
import Orderconfirmationpage from './pages/Orderconfirmationpage';
import Footer from './Entrance/Footer';
import Userprovider from './context/Usercontext';
import Productdetailpage from './pages/Productdetailpage';
import Orderdetailpage from './pages/orderdetailpage';
import Admindashboard from './admin/pages/Admindashboard';
import Productslayout from './admin/pages/layouts/productslayout';
import Userslayout from './admin/pages/layouts/Userslayout';
import Orderslayout from './admin/pages/layouts/Orderslayout';
import Layout from './admin/pages/layouts/Layout';
import Forgotpassword from './components/Forgotpassword';

function App() {
  const location = useLocation();
  const isadmin = location.pathname.startsWith("/admin");
  return (
    <>
  



      <Favoritesprovider>
        {!isadmin && <Navbar/>}

      <ToastContainer position='top-center' autoClose={2000} />

      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/bag' element={<Bagpage />} />
        <Route path='/shop' element={<Productspage />} />
        <Route path='/shop/:id' element={<Productdetailpage/>} />
        <Route path='/Registerpage' element={<Registerpage />} />
        <Route path='/Loginpage' element={<Loginpage />} />
        <Route path='/favorites' element={<Favoritespage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/checkout' element={<Checkoutpage/>}/>
        <Route path='/orderdetailpage' element={<Orderdetailpage/>}/>
        <Route path='orderconfirmation' element={<Orderconfirmationpage/>}/>
        <Route path='/forgotpassword' element={<Forgotpassword/>}/>
      </Routes>
      {!isadmin && <Footer/>}


            {/* admin pages */}



      </Favoritesprovider>
<Routes>
  <Route path="/admin" element={<Layout />}>
    <Route path="dashboard" element={<Admindashboard />} />
    <Route path="products" element={<Productslayout />} />
    <Route path="users" element={<Userslayout />} />
    <Route path="orders" element={<Orderslayout />} />
  </Route>
</Routes>

      
    </>
  );
}

export default App;
