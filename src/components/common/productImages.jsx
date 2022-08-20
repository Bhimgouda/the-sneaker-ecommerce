import React from "react";

const ProductImage = () => {
  return (
    <div className="product__image-container disable-select">
      <div className="image-slider">
        <img src="./images/image-product-4.webp" alt="" id="last-clone" />
        <img
          src="./images/image-product-1.webp"
          alt=""
          id="product__image--1"
        />
        <img
          src="./images/image-product-2.webp"
          alt=""
          id="product__image--2"
        />
        <img
          src="./images/image-product-3.webp"
          alt=""
          id="product__image--3"
        />
        <img
          src="./images/image-product-4.webp"
          alt=""
          id="product__image--4"
        />

        <img src="./images/image-product-1.webp" alt="" id="first-clone" />
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
