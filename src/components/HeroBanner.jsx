import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SLIDES from "../models/slides";
import HeroSlide from "./HeroSlide";

const HeroBanner = () => {
  const [heroHeight, setHeroHeight] = useState("auto");

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;
      const vh = window.innerHeight;
      setHeroHeight(vh - headerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    dots: true,
  };

  return (
    <section
      className="hero-bnr"
      style={{ height: `${heroHeight}px`, overflow: "hidden" }}
    >
      <div className="container cstm-container-xl px-0 h-100">
        <div className="row g-0 h-100">
          <div className="col-12 h-100">
            <Slider {...settings} className="hero-slider mb-0 h-100">
              {SLIDES.map((slide, index) => (
                <HeroSlide key={index} {...slide} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
