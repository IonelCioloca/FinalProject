import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import InvolveSlide from "./InvolveSlide";
import SLIDESINVOLVE from "../models/slidesInvolve";

const InvolveSection = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="involve">
      <div className="container cstm-container-std">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="title-s1">
              Discover how you can make a difference!
            </h3>
          </div>
          <div className="col-12 position-relative">
            <Slider {...settings}>
              {SLIDESINVOLVE.map((slide, idx) => (
                <InvolveSlide
                  key={idx}
                  title={slide.title}
                  img={slide.img}
                  imgRev={slide.imgRev}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvolveSection;
