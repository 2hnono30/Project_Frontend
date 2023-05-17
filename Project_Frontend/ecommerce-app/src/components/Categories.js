import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CategoryService } from "../Services/Categories/CategoryService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";

const Categories = () => {
    let location = useLocation();
    const [state, setState] = useState({
        categories: [],
        errorMessage: ''
    });
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    
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
    if (location.pathname.includes("product")) {
        return (
            <>
                <div >
                    <ul className='ps-0'>
                        {(
                            categories.map(category => {
                                return (
                                    <li key={category.id}>
                                        <Link to={"/product/category/" + `${category.id}`} className="d-flex gap align-items-center test">
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
            </>
        );
    } else {
        return (
            <>
                {/* <Slider {...settings}> */}
                    <Marquee className="d-flex">
                        {(
                            categories.map(category => {
                                return (
                                    <div key={category.id} >
                                        <Link to={`/product/category/${category.id}`} className="d-flex gap align-items-center test gap-100">
                                            <div>
                                                <h6>{category.name}</h6>
                                            </div>
                                            <img src="images/camera.jpg" alt="camera" />
                                        </Link>
                                    </div>
                                )
                            })
                        )}
                    </Marquee>
                {/* </Slider> */}
            </>
        );
    }
};
export default Categories;