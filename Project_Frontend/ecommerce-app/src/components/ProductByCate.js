import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
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


const ProductByCate = () => {

    const [flag, setFlag] = useState(false);
    const [category, setCategory] = useState({
        Categories: [],
        CateErrorMessage: ''
    });
    const PAGE = 4;
    const callCateApi = () => {
        try {
            async function fetchCategories(event) {
                let resCate = await CategoryService.getCategories();
                setCategory({
                    ...category,
                    Categories: resCate.data.content,
                })
                setFlag(true);
            }
            fetchCategories();
        } catch (error) {
            setCategory({ ...category, CateErrorMessage: error.message });
        }
    }
    const callProductByCateApi = () => {
        try {
            async function fetchProductByCate() {
                let newCategory = { CateErrorMessage: '', Categories: [] }
                for (let i = 0; i < category.Categories.length; i++) {
                    let id = category.Categories[i].id;
                    let resProduct = await ProductService.getProductListByCateHome(undefined, id, PAGE);
                    category.Categories[i].products = resProduct.data.content;
                    newCategory.Categories.push({
                        name: category.Categories[i].name,
                        id: category.Categories[i].id,
                        products: resProduct.data.content
                    })
                }
                setCategory(newCategory);
            }
            fetchProductByCate();
        } catch (error) {
            setCategory({ ...category, CateErrorMessage: error.message });
        }
    }

    useEffect(function ProductListByCate() {
        try {
            callCateApi();
            if (flag) {
                callProductByCateApi();
            }
        } catch (error) {
            setCategory({ ...category, CateErrorMessage: error.message });
        }
    }, [flag])
    return (
        <>
            {(
                category.Categories.map(category => {
                    return (
                        <div key={category.id} className="row">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <h3 className="section-heading">{category.name}</h3>
                                    <Link to={"/product/category/" + `${category.id}`} className="text-red">
                                        View all products
                                    </Link>
                                </div>
                            </div>
                            {category.products?.map(item => {
                                return (
                                    <div className="col-3" key={item.id}>
                                        <Link
                                            to={("/product/" + item.id)}
                                            className="product-card position-relative"
                                        >
                                            <div className="product-image">
                                                <img
                                                    src={item.avatar || NoProduct}
                                                    //  src={watch}
                                                    className="img-fluid"
                                                    alt="product image" />
                                                <img
                                                    src={item.avatar || NoProduct}
                                                    //  src={watch2} 
                                                    className="img-fluid"
                                                    alt="product image" />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">{item.nameBrand}</h6>
                                                <h5 className="product-title">
                                                    {item.name}
                                                </h5>
                                                <p className="price">{currencyFormat(item.price)}</p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                    <button className="border-0 bg-transparent">
                                                        <img src={prodcompare} alt="compare" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <img src={view} alt="view" />
                                                    </button>
                                                    <button className="border-0 bg-transparent">
                                                        <img src={addcart} alt="addcart" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            )}
        </>
    );
};

export default ProductByCate;