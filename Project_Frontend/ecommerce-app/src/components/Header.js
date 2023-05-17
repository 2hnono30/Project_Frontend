import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { BsSearch } from "react-icons/bs";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import { CategoryService } from "../Services/Categories/CategoryService";
import { ProductService } from "../Services/Product/ProductService";
import { currencyFormat } from "./Utils/Utils";
import AppContext from "../contexts/AppContext";
// import Logo from "../images/pngtree-online-shopping-logo-desing-png-image_8918925.png";
import Logo from "../images/LogoCHY.png";

const Header = ({ navigation }) => {
    const [appState, appDispatch] = useContext(AppContext);

    let initOrderValue = appState.cartItems;
    if (!initOrderValue) {
        initOrderValue = [];
    }
    let total = 0;
    initOrderValue.forEach(element => {
        total += (element.product.price * element.quantity);
    })



    const navigate = useNavigate();

    const [state, setState] = useState({
        categories: [],
        errorMessage: '',
    });

    const [search, setSearch] = useState('');

    const logout = async function (event) {
        event.preventDefault();
        try {
            localStorage.clear();
            toast.success('Logout successfully!');
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1000)
        } catch (error) {
            console.log("Logout error");
        }
    }

    useEffect(function () {
        try {
            setState({ ...state });
            async function fetchAllCategories() {
                let resCategories = await CategoryService.getCategories();
                setState({
                    ...state,
                    categories: resCategories.data.content,
                })
            }
            fetchAllCategories();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }, [])

    const { categories, errorMessage } = state;

    return (
        <>
            <ToastContainer />
            <header className="header-upper py-3 d-flex">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <Link to={'/'}>
                                <h2>
                                    <img src={Logo} alt="" style={{
                                        height: '60px',
                                        width: '150px',
                                    }} />
                                </h2>
                            </Link>
                        </div>
                        <div className="col-8">
                            <form className="input-group" onSubmit={(e) => {
                                e.preventDefault();
                                navigate(search == "" || search == undefined ? "/" : "/product", { state: { search: search } })
                            }}>
                                <input
                                    type="search"
                                    name="search"
                                    className="form-control py-2"
                                    placeholder="Search Products here..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    aria-label="Search Products here..."
                                    aria-describedby="basic-addon2"
                                />
                                <button style={{ background: 'none', border: 'none' }}>
                                    <span
                                        className="input-group-text py-3" id="basic-addon2"><BsSearch className="fs-6" /></span>
                                </button>

                            </form>
                        </div>
                        <div className="col-2">
                            <div className="container-xxl d-flex flex-row-reverse gap-10">
                                <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                                    <div>
                                        {localStorage.fullName == null ? (
                                            <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                                                <img src={user} alt="user" />
                                                <p className="mb-0">
                                                    Login
                                                </p>
                                            </Link>

                                        ) : (
                                            <div className="btn-group">
                                                <div className="btn login-avatar" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img style={{ height: '40px', width: '40px', borderRadius: '50%', backgroundColor: 'lightgrey' }} src={user} alt="user" />
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" href="#">{localStorage.fullName}</Link></li>
                                                    <li><Link className="dropdown-item" href="#">Another action</Link></li>
                                                    <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><button onClick={logout} className="dropdown-item">Logout</button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                                    <div>
                                        <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                                            <img style={{width:'40px',height:'40px'}} src={cart} alt="cart" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
                                            <img src={menu} alt="" />
                                            <span className="me-5 d-inline-block">
                                                Shop Categories
                                            </span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            {(
                                                categories.map(category => {
                                                    return (
                                                        <li key={category.id}>
                                                            <Link className="dropdown-item text-white" to={"/product/category/" + `${category.id}`} >
                                                                <div>
                                                                    <h6>{category.name}</h6>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            )}
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