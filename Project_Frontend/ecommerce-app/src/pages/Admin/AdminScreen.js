import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import CategoryScreen from "./Category/CategoryScreen";
import CustomerScreen from "./Customer/CustomerScreen";
import Sidebar from './Sidebar';
import ProductScreen from './Product/ProductScreen';
import './Sidebar.scss';
import OrderScreen from './Order/OrderScreen';
import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import BrandScreen from './Brand/BrandScreen';

function AdminScreen() {
    const divStyle = {
        margin: '0px 240px',
    }
<<<<<<< HEAD

=======
>>>>>>> 0db3bc7a2e77f210262447fecdfa03b70037b36f
    const [closeMenu, setCloseMenu] = useState(false);
    return (
        <>
            <ConfirmProvider>
                <ToastContainer />
                <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
                <div style={{ paddingLeft: 250 }}>
                    <Routes>
                        <Route path={'categories'} element={<CategoryScreen closeMenu={closeMenu} />} />
                        <Route path={'customers'} element={CustomerScreen()} />
                        <Route path={'products'} element={ProductScreen()} />
                        <Route path={'home'} element={CustomerScreen()} />
                        <Route path={'brands'} element={<BrandScreen closeMenu={closeMenu} />} />
                        <Route path={'orders'} element={<OrderScreen />} />
                    </Routes>
                    <Outlet />
                </div>
            </ConfirmProvider>
        </>

    );
}

export default AdminScreen;