import React from 'react';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import CategoryScreen from "./Category/CategoryScreen";
import CustomerScreen from "./CustomerScreen";


function AdminScreen() {
    return (
        <>
            <h1>Hello</h1>
            <Link to={'categories'} >Category</Link>
            <Link to={'customers'} >Customer</Link>
            <Routes>
                <Route path={'categories'} element={CategoryScreen()} />
                <Route path={'customers'} element={CustomerScreen()} />
            </Routes>
            <Outlet />
        </>

    );
}

export default AdminScreen;