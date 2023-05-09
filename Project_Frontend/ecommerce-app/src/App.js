import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Layout from './components/Layout';
import Home from './pages/Home';
import OurStore from './pages/OurStore';
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminScreen from "./pages/Admin/AdminScreen";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='product' element={<OurStore />} />
            <Route path='product/category/:id' element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="product/category/:id" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/admin/*" element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
