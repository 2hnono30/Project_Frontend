import React, { useState } from "react";
import Brand from './Images/brand.svg';
import Product from './Images/product.svg';
import Category from './Images/category.svg';
import Account from './Images/account.svg';
import Cart from './Images/cart.svg';
import Dashboard from './Images/dashboard.svg';
import Customer from './Images/customer.svg';
import Logout from './Images/logout.svg';

import { useLocation, Link } from "react-router-dom";

const Sidebar = (props) => {

    const location = useLocation();
    const { closeMenu, setCloseMenu } = props;
    // const [closeMenu, setCloseMenu] = useState(false);
    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src="https://th.bing.com/th/id/OIP.fTk_wX8hbQxVZEIDwyuDEAHaHk?pid=ImgDet&rs=1" alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, John👋</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/admin" ? "active" : ""}>
                        <img src={Dashboard}></img>
                        <Link to={''}>Dashboard</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/admin/orders"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Cart}></img>
                        <Link to={'orders'}>Order</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/admin/products" ? "active" : ""
                        }
                    >
                        <img src={Product}></img>
                        <Link to={'products'}>Product</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/admin/customers" ? "active" : ""
                        }
                    >
                        <img src={Customer}></img>
                        <Link to={'customers'}>Customer</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/admin/brands" ? "active" : ""
                        }
                    >
                        <img src={Brand}></img>
                        <Link to={'brands'}>Brand</Link>
                    </li>

                    <li
                        className={
                            location.pathname === "/admin/categories" ? "active" : ""
                        }
                    >
                        <img src={Category}></img>
                        <Link to={'categories'}>Category</Link>
                    </li>
                    <li
                        className={
                            location.pathname === "/admin/account" ? "active" : ""
                        }
                    >
                        {/* <VscAccount /> */}
                        <img src={Account}></img>
                        <Link to={'account'} >Account</Link>
                    </li>

                    <li

                    >
                        <img src={Logout}></img>
                        <Link to='/logout' >Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
