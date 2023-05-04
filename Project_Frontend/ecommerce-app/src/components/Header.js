import React, { useState, useEffect } from "react";
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

const Header = ({ navigation }) => {

    const navigate = useNavigate();

    const [state, setState] = useState({
        categories: [],
        errorMessage: ''
    });

    const [search, setSearch] = useState();

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
                        <div className="col-4">
                            <h4>
                                <Link to='/' className="text-white">Developers App</Link>
                            </h4>
                        </div>
                        <div className="col-8">
                            <form className="input-group" onSubmit={(e) => {
                                e.preventDefault();
                                navigate(search == "" || search == undefined ? "/" : "/product", { state: { search: search } })
                            }}>
                                <input
                                    onInput={(e) => { setSearch(e.target.value) }}
                                    // value={search}
                                    type="search"
                                    name="search"
                                    className="form-control py-2"
                                    placeholder="Search Products here..."
                                    aria-label="Search Products here..."
                                    aria-describedby="basic-addon2"
                                />
                                <span className="input-group-text py-3" id="basic-addon2"><BsSearch className="fs-6" /></span>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container-xxl d-flex col-4 gap-10">
                    <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                        <div>

                            {localStorage.fullName == null ? (
                                <Link to="/signup" className="d-flex align-items-center gap-10 text-white">
                                    <FontAwesomeIcon className="signUpSvg" icon={faUserPlus} />
                                    <p className="mb-0">
                                        Sign Up
                                    </p>
                                </Link>
                            ) : (
                                <div className="d-flex text-white d-none">
                                    <FontAwesomeIcon className="signUpSvg" icon={faUserPlus} />
                                    <p className="mb-0">
                                        Sign Up
                                    </p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    <div className="header-upper-links d-flex align-items-center justify-content-between gap-10">
                        <div>
                            {localStorage.fullName == null ? (
                                <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                                    <img src={user} alt="user" />
                                    <p className="mb-0">
                                        Sign in
                                    </p>
                                </Link>
                            ) : (
                                <div className="d-flex text-white">
                                    <img src={user} alt="user" />
                                    <div onClick={logout} className="button align-items-center gap-10 text-white">{localStorage.fullName} || Logout</div>
                                </div>
                            )
                            }
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