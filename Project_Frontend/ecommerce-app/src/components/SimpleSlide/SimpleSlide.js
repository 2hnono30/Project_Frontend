import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Button from 'react-bootstrap/Button';
import "../../pages/SliderCss.css";

const SimpleSlide = ({ initialSlide = 0, urls, deleteHandler }) => {
    const [hasSetPosition, setHasSetPosition] = useState(false);
    const slider = useRef();
    useEffect(() => {
        if (slider.current && !hasSetPosition) {
            slider.current.slickGoTo(initialSlide);
            setHasSetPosition(true);
        }
    }, [initialSlide, hasSetPosition, slider]);

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: urls.length > 3 ? 3 : urls.length,
        slidesToScroll: 1,
        initialSlide,
    };

    return (
        <Slider {...settings} style={{ width: 500}}>
            {
                urls.map((img, index) => (
                    <div className='d-flex flex-row-reverse bd-highlight'  key={index}>
                        <Button style={{marginLeft: -20}} className='btn btn-close' onClick={() => deleteHandler(img, index)}></Button>
                        <img src={img} height={150} width={150} />
                    </div>
                ))
            }

        </Slider >
    )
}

export default SimpleSlide