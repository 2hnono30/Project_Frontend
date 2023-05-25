import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import { BrandService } from "../Services/Brands/BrandService";
const Brand = () => {
    let location = useLocation();
    const [state, setState] = useState({
        brands: [],
        errorMessage: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        try {
            setLoading(true);
            async function fetchAllBrands() {
                let resBrands = await BrandService.getBrands();
                setState({
                    ...state,
                    brands: resBrands.data.content,
                })
                setLoading(false);
            }
            fetchAllBrands();
        } catch (error) {
            setState({ ...state, errorMessage: error.message });
        }
    }, [])

    const { brands, errorMessage } = state;

    return (
        <>
            <Marquee className="d-flex">
                {(
                    brands.map(Brand => {
                        return (
                            <div key={Brand.id} className="mx-4 ww-25">
                                <img src={Brand.fileUrl} alt={Brand.name} />
                            </div>
                        )
                    })
                )}
            </Marquee>
        </>
    );
};
export default Brand;