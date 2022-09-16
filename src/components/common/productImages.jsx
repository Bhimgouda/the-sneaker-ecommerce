import React, { useState } from "react";
import ProductOverlay from "./productOverlay";

const ProductImage = (props) => {
  const { productImages } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [overlay, setOverlay] = useState(false);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleImagePrev = () => {
    if (currentImage === 0) setCurrentImage(productImages.length - 1);
    else setCurrentImage(currentImage - 1);
  };

  const handleImageNext = () => {
    if (currentImage === productImages.length - 1) setCurrentImage(0);
    else setCurrentImage(currentImage + 1);
  };

  const handleOverlay = () => {
    if (overlay) setOverlay(false);
    else setOverlay(true);
  };

  return (
    <React.Fragment>
      <div
        onClick={handleOverlay}
        className="product__image-container disable-select"
      >
        <div className="image-slider">
          <img src={productImages[currentImage]} alt="" id="last-clone" />
        </div>
        <span
          onClick={handleImagePrev}
          className="icon-container image-slider-btn"
          id="prev-btn--main"
        >
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
        <span
          onClick={handleImageNext}
          className="icon-container image-slider-btn"
          id="next-btn--main"
        >
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
      <div className="thumbnail-container">
        {productImages.map((image, index) => {
          let thumbnailClass = "thumbnail ";
          if (index === currentImage) thumbnailClass += "thumbnail__current";
          return (
            <img
              onClick={() => handleImageChange(index)}
              key={index}
              id={index}
              className={thumbnailClass}
              src={image}
              alt=""
            />
          );
        })}
      </div>
      <ProductOverlay
        startImage={currentImage}
        images={productImages}
        hideOverlay={handleOverlay}
        overlayOn={overlay}
      />
    </React.Fragment>
  );
};

export default ProductImage;
