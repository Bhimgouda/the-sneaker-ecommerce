import { useState } from "react";
const ProductOverlay = (props) => {
  const { hideOverlay, overlayOn, images, thumbnailImages } = props;

  const [currentImage, setCurrentImage] = useState(0);

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleImagePrev = () => {
    if (currentImage === 0) setCurrentImage(images.length - 1);
    else setCurrentImage(currentImage - 1);
  };

  const handleImageNext = () => {
    if (currentImage === images.length - 1) setCurrentImage(0);
    else setCurrentImage(currentImage + 1);
  };

  let overlayClass = "product--overlay disable-select product--overlay--hidden";
  if (overlayOn) overlayClass = "product--overlay disable-select";
  return (
    <div className={overlayClass}>
      <div className="overlay__image-container">
        <span onClick={hideOverlay} id="close-btn">
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fill="#69707D"
              fillRule="evenodd"
            />
          </svg>
        </span>
        <span
          onClick={handleImagePrev}
          className="icon-container image-slider-btn"
          id="prev-btn--overlay"
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
          id="next-btn--overlay"
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
        <div className="overlay__image">
          <div className="image-slider">
            <img src={images[currentImage]} />
          </div>
        </div>
      </div>

      <div className="thumbnail-container">
        {thumbnailImages.map((img, index) => {
          let thumbnailClass = "thumbnail ";
          if (index === currentImage) thumbnailClass += "thumbnail__current";
          return (
            <div key={index} className="overlay-thumbnail-background">
              <img
                onClick={() => handleImageChange(index)}
                id={index}
                className={thumbnailClass}
                src={img}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductOverlay;
