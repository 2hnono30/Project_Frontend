import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick'

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
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide,
    };

    return (
        <Slider ref={slider} {...settings}>
            {urls.map((img, index) => (
                <>
                    <button onClick={() => deleteHandler(img, index)}>x</button>
                    <img src={img} height={500} />
                </>
            ))}
        </Slider>
    )
}

export default SimpleSlide