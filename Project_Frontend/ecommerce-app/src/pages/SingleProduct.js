import React, { useState, useEffect, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import { ProductService } from "../Services/Product/ProductService";
import { currencyFormat } from "../components/Utils/Utils";
import AppContext from "../contexts/AppContext";
import Slider from "react-slick";
import { useRef } from "react";
import '../pages/SliderCss.css';
import { Button } from "@mui/material";
const SingleProduct = ({ initialSlide = 0 }) => {
    const [appState, appDispatch] = useContext(AppContext);
    const [hasSetPosition, setHasSetPosition] = useState(false);
    const slider = useRef();
    const { id } = useParams();
    const [state, setState] = useState({
        product: {},
        errorMessage: '',
    });
    const navigate = useNavigate();
    const productApiById = (id) => {
        try {
            setState({ ...state });
            async function fetchProductById() {
                let resProduct = await ProductService.getProductById(id);
                // console.log(resProduct);
                resProduct.data.images.unshift(resProduct.data.avatar);
                
                setState({
                    ...state,
                    product: resProduct.data,
                });
                setImage(resProduct.data.avatar)
            }
            fetchProductById();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }
    useEffect(() => {
        if (slider.current && !hasSetPosition) {
            slider.current.slickGoTo(initialSlide);
            setHasSetPosition(true);
        }
    })

    useEffect(function ProductList() {
        productApiById(id);
    }, [id])
    const { product, errorMessage } = state;

    const addOrderProduct = () => {
        let initOrderValue = appState.cartItems;
        let check = false;
        let currentIndex = 0;
        if (!initOrderValue) {
            initOrderValue = [];
            initOrderValue.push({ product: product, quantity: 1 });
            appDispatch({ type: "SET_CART_ITEMS", payload: initOrderValue })
        } else {
            for (let i = 0; i < initOrderValue.length; i++) {
                const element = initOrderValue[i];
                if (element.product.id === id) {
                    check = true;
                    currentIndex = i;
                    break;
                } else {
                    check = false;
                }
            }
            if (check) {
                initOrderValue[currentIndex].quantity++;
                console.log(initOrderValue[currentIndex]);
                appDispatch({ type: "SET_CART_ITEMS", payload: initOrderValue })
            } else {
                initOrderValue.push({ product: product, quantity: 1 });
                localStorage.setItem('orders', JSON.stringify(initOrderValue));
            }
        }
        navigate("/cart")
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide
    };

    const [image,setImage]= useState('null');
    const imageChange = (img) =>{
        setImage(img)
    }

    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title="Product Name" />
            <div class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    <ReactImageZoom 
                                    img={image}
                                    width= {594}
                                    height= {600}
                                    zoomWidth= {600}
                                    />
                                </div>
                            </div>
                            <div className="other-product-images d-flex flex-wrap gap-30">
                                <Slider {...settings}>
                                    {product.images?.map((img, index) => (
                                        <Button key={index} type="button" onClick={()=>{imageChange(img)}}>
                                            <img src={img} alt={`Image ${index}`} className="img-fluids" />
                                        </Button>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className="title">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <p className="price">

                                        {product.price ? currencyFormat(product.price) : ""}


                                    </p>
                                </div>
                                <div className=" py-3">
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Brand :</h3>
                                        <p className="product-data">{product.nameBrand}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Category :</h3>
                                        <p className="product-data">{product.nameCategory}</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">Availablity :</h3>
                                        <p className="product-data">In Stock</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                        <div className="d-flex align-items-center gap-30 ms-5">
                                            <button
                                                className="button border-0"
                                                data-bs-target="#staticBackdrop"
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addOrderProduct();
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                            <button className="button signup">Buy It Now</button>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-10 flex-column  my-3">
                                        <h3 className="product-heading">Shipping & Returns :</h3>
                                        <p className="product-data">
                                            Free shipping and returns available on all orders! <br /> We
                                            ship all US domestic orders within
                                            <b>5-10 business days!</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class1="description-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3">
                                <p>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class1="reviews-wrapper home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 id="review">Reviews</h3>
                            <div className="review-inner-wrapper">
                                <div className="review-head d-flex justify-content-between align-items-end">
                                    <div>
                                        <h4 className="mb-2">Customer Reviews</h4>
                                        <div className="d-flex align-items-center gap-10">
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className="mb-0">Based on 2 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="review-form py-4">
                                    <h4>Write a Review</h4>
                                    <form action="" className="d-flex flex-column gap-15">
                                        <div>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={4}
                                                edit={true}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                name=""
                                                id=""
                                                className="w-100 form-control"
                                                cols="30"
                                                rows="4"
                                                placeholder="Comments"
                                            ></textarea>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="button border-0">Submit Review</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="reviews mt-4">
                                    <div className="review">
                                        <div className="d-flex gap-10 align-items-center">
                                            <h6 className="mb-0">Navdeep</h6>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <p className="mt-3">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                            Consectetur fugit ut excepturi quos. Id reprehenderit
                                            voluptatem placeat consequatur suscipit ex. Accusamus dolore
                                            quisquam deserunt voluptate, sit magni perspiciatis quas
                                            iste?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class1="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="section-heading">Our Popular Products</h3>
                            </div>
                        </div>
                        <div className="d-flex">
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;
