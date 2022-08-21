import React from "react";

const ProductImage = ({ showOverlay, productImages }) => {
  return (
    <div
      onClick={showOverlay}
      className="product__image-container disable-select"
    >
      <div className="image-slider">
        <img
          src={productImages[productImages.length - 1]}
          alt=""
          id="last-clone"
        />
        {productImages.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              alt=""
              id={`product__image--${index + 1}`}
            />
          );
        })}
        <img src={productImages[0]} alt="" id="first-clone" />
      </div>
      <span className="icon-container image-slider-btn" id="prev-btn--main">
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </span>
      <span className="icon-container image-slider-btn" id="next-btn--main">
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default ProductImage;
