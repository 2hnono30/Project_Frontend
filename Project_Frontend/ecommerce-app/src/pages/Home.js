import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";
import Special from "../components/Special";
import { ProductService } from "../Services/Product/ProductService";
import { CategoryService } from "../Services/Categories/CategoryService";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import NoProduct from "../images/NoProduct.jpg";
import { currencyFormat } from "../components/Utils/Utils";
import prodcompare from "../images/prodcompare.svg";
import ProductByCate from "../components/ProductByCate";

const Home = () => {
    const [product, setProduct] = useState({
        products: [],
        errorMessage: ''
    });
    const PAGE = 4;
    const callApi = (cate, sort, page) => {
        try {
            setProduct({ ...product });
            async function fetchAllProducts() {
                let resProduct = await ProductService.getProductListBySort(cate, sort, page);
                console.log(resProduct);
                setProduct({
                    ...product,
                    products: resProduct.data.content,
                });
            }
            fetchAllProducts();
        } catch (error) {
            setProduct({ ...product, errorMessage: error.message });
        }
    }
    useEffect(function ProductList() {
        callApi(undefined, undefined, PAGE);
    }, [])
    const { products, errorMessage } = product;
    //   console.log(products);
    return (
        <>
            <section className="home-wrapper-1 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-banner position-relative ">
                                <img
                                    src="images/main-banner-1.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>SUPERCHARGED FOR PROS.</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>From $999.00 or $41.62/mo.</p>
                                    <Link className="button">BUY NOW</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                                <div className="small-banner position-relative">
                                    <img
                                        src="images/catbanner-01.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Best Sake</h4>
                                        <h5>iPad S13+ Pro.</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img
                                        src="images/catbanner-02.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative ">
                                    <img
                                        src="images/catbanner-03.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
                                        </p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative ">
                                    <img
                                        src="images/catbanner-04.jpg"
                                        className="img-fluid rounded-3"
                                        alt="main banner"
                                    />
                                    <div className="small-banner-content position-absolute">
                                        <h4>NEW ARRIVAL</h4>
                                        <h5>But IPad Air</h5>
                                        <p>
                                            From $999.00 <br /> or $41.62/mo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="services d-flex align-items-center justify-content-between">
                                {/* {services?.map((i, j) => {
                                    return (
                                        <div className="d-flex align-items-center gap-15" key={j}>
                                            <img src={i.image} alt="services" />
                                            <div>
                                                <h6>{i.title}</h6>
                                                <p className="mb-0">{i.tagline}</p>
                                            </div>
                                        </div>
                                    );
                                })} */}
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service.png" alt="services" />
                                    <div>
                                        <h6>Free Shiping</h6>
                                        <p className="mb-0">From all orders overs $5</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-02.png" alt="services" />
                                    <div>
                                        <h6>Daily Surprise Offers</h6>
                                        <p className="mb-0">Save upto 25% off</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-03.png" alt="services" />
                                    <div>
                                        <h6>Support 24/7</h6>
                                        <p className="mb-0">Shop with an export</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-04.png" alt="services" />
                                    <div>
                                        <h6>Affordable Prices</h6>
                                        <p className="mb-0">Get Factory Defaut Price</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-05.png" alt="services" />
                                    <div>
                                        <h6>Secure Payments</h6>
                                        <p className="mb-0">100% Protected Payment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <Categories />
                        </div>
                    </div>
                </div>
            </section>
            <section className="featured-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between">
                                <h3 className="section-heading">Featured Collection</h3>
                                <Link to="/product/category/1" state={{ sortBy: "Featured" }} className="text-red">
                                    View all products
                                </Link>
                            </div>
                        </div>
                        <ProductCard productList={products} />
                    </div>
                </div>
            </section>
            <section className="special-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <h3 className="section-heading">Special Products</h3>
                            <Link to="/product" className="text-red">
                                View all products
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <Special />
                            </div>
                            <div className="col-6 mb-3">
                                <Special />
                            </div>
                            <div className="col-6 mb-3">
                                <Special />
                            </div>
                            <div className="col-6 mb-3">
                                <Special />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="popular-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <ProductByCate />
                </div>
            </section>
            <section className="famous-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="famous-card position-relative">
                                <img
                                    src="images/famous-1.webp"
                                    className="img-fluid"
                                    alt="famous"
                                />
                                <div className="famous-content position-absolute">
                                    <h5>Big Screen</h5>
                                    <h6>Smart Watch Series 7</h6>
                                    <p>From $399or $16.62/mo. for 24 mo.*</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative">
                                <img
                                    src="images/famous-2.webp"
                                    className="img-fluid"
                                    alt="famous"
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="text-dark">Studio Display</h5>
                                    <h6 className="text-dark">600 nits of brightness.</h6>
                                    <p className="text-dark">27-inch 5K Retina display</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative">
                                <img
                                    src="images/famous-3.webp"
                                    className="img-fluid"
                                    alt="famous"
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="text-dark">smartphones</h5>
                                    <h6 className="text-dark">Smartphone 13 Pro.</h6>
                                    <p className="text-dark">
                                        Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="famous-card position-relative">
                                <img
                                    src="images/famous-3.webp"
                                    className="img-fluid"
                                    alt="famous"
                                />
                                <div className="famous-content position-absolute">
                                    <h5 className="text-dark">home speakers</h5>
                                    <h6 className="text-dark">Room-filling sound.</h6>
                                    <p className="text-dark">
                                        From $699 or $116.58/mo. for 12 mo.*
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="marque-wrapper py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="marque-inner-wrapper card-wrapper">
                                <Marquee className="d-flex">
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-01.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-02.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-03.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-04.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-05.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-06.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-07.png" alt="brand" />
                                    </div>
                                    <div className="mx-4 ww-25">
                                        <img src="images/brand-08.png" alt="brand" />
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>)
};

export default Home;