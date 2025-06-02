import React from "react";

const InvolveSlide = ({ title, img, imgRev }) => {
  return (
    <div className="slide">
      <div className="card-s">
        <div className="content">
          <img src={imgRev} alt="icon hover" className="img-dev-inv-rev" />
          <img src={img} alt="icon" className="img-dev-inv" />
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default InvolveSlide;
