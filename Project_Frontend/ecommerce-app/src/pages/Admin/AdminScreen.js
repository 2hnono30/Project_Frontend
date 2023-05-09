import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import CategoryScreen from "./Category/CategoryScreen";
import CustomerScreen from "./Customer/CustomerScreen";
import Sidebar from './Sidebar';
import ProductScreen from './Product/ProductScreen';
import './Sidebar.scss';
import OrderScreen from './Order/OrderScreen';
import { useState } from 'react';


function AdminScreen() {
    const divStyle = {
        margin: '0px 240px',
        backGround: 'red'
    }

    const [closeMenu, setCloseMenu] = useState(false);
    return (
        <>

            <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />

            <Routes>
                <Route path={'categories'} element={CategoryScreen()} />
                <Route path={'customers'} element={CustomerScreen()} />
                <Route path={'products'} element={ProductScreen()} />
                <Route path={'home'} element={CustomerScreen()} />
                <Route path={'brands'} element={CustomerScreen()} />
                <Route path={'orders'} element={<OrderScreen />} />
            </Routes>

            <Outlet />


        </>

    );
}

export default AdminScreen;