import React, { useState } from "react";
import Slider from "react-slick";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function SampleNextArrow(props) {
    const { onClick, customNextArrowStyle } = props;

    const NextArrowStyle = {
        position: "absolute",
        top: "-45px",
        right: 0
    }

    return (
        <button
            className="slick-container-button"
            style={{ ...NextArrowStyle, ...customNextArrowStyle }}
            onClick={onClick}
        >
            <KeyboardArrowRightIcon />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { onClick, customPrevArrowStyle } = props;

    const PrevArrowStyle = {
        position: "absolute",
        top: "-45px",
        right: "35px"
    }


    return (
        <button
            className="slick-container-button"
            style={{ ...PrevArrowStyle, ...customPrevArrowStyle }}
            onClick={onClick}
        >
            <KeyboardArrowLeftIcon />
        </button>
    );
}

const Slick = (props) => {
    const { children, setDot, setArrow, swipe, customNextArrowStyle, customPrevArrowStyle } = props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: children.length > 4,
        appendDots: (dots) => (
            <div>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: (i) => (
            <div
                style={{
                    width: "50px",
                    color: i === currentSlide ? "#fff" : "#049962c7",
                    border: "1px #049962c7 solid",
                    background: i === currentSlide ? "#049962c7" : "none",
                }}
            >
                {i + 1}
            </div>
        ),
        beforeChange: (current, next) => {
            setCurrentSlide(next);
        },

    };
    return (
        <div className="slick-container">
            <Slider {...settings}
                dots={setDot ? true : false}
                arrows={setArrow}
                swipe={swipe}
                nextArrow={< SampleNextArrow customNextArrowStyle={customNextArrowStyle} />}
                prevArrow={<SamplePrevArrow customPrevArrowStyle={customPrevArrowStyle} />}>
                {children}
            </Slider>
        </div >
    );
}

export default Slick;

