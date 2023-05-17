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
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp/Signup";
import AdminScreen from "./pages/Admin/AdminScreen";
import { ConfirmProvider } from "material-ui-confirm";
import AppProvider from './contexts/AppContext/AppProvider';
import ScrollToTop from './components/Scroll/ScrollToTop';
import { FormikProvider } from 'formik';
function App() {
  return (
    <>
      <ConfirmProvider>
        <AppProvider>
          <BrowserRouter>
            <ScrollToTop />
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
        </AppProvider>
      </ConfirmProvider>
    </>
  );
}

export default App;
