import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import { BsSearch } from "react-icons/bs";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <>
            <header className="header-upper py-3 d-flex">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <h4>
                                <Link className="text-white">Developers App</Link>
                            </h4>
                        </div>
                        <div className="col-8">
                            <div className="input-group">
                                <input type="text" className="form-control py-2" placeholder="Search Products here..." aria-label="Search Products here..." aria-describedby="basic-addon2" />
                                <span className="input-group-text py-3" id="basic-addon2"><BsSearch className="fs-6" /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl d-flex col-4 gap-10">
                    <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                        <div>
                            <Link to="/signup" className="d-flex align-items-center gap-10 text-white">
                                <FontAwesomeIcon className="signUpSvg" icon={faUserPlus} />
                                <p className="mb-0">
                                    Sign Up
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                        <div>
                            <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                                <img src={user} alt="user" />
                                <p className="mb-0">
                                    Sign in
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                        <div>
                            <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                                <img src={cart} alt="cart" />
                                <div className="d-flex flex-column gap-10">
                                    <span className="badge bg-white text-dark">0</span>
                                    <p className="mb-0">
                                        $ 500
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-bottom py-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center">
                                <div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img src="images/menu.svg" alt="" />
                                            <span className="me-5 d-inline-block">
                                                Shop Categories
                                            </span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <Link className="dropdown-item text-white" to="">
                                                    Action
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-white" to="">
                                                    Another action
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item text-white" to="">
                                                    Something else here
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-links">
                                    <div className="d-flex align-items-center gap-30">
                                        <NavLink className="text-white" to="/">Home </NavLink>
                                        <NavLink className="text-white" to="/product">Our Strore</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;