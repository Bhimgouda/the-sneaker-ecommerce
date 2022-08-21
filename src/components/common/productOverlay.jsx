const ProductOverlay = ({
  hideOverlay,
  overlayOn,
  images,
  thumbnailImages,
}) => {
  console.log(overlayOn);
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
            <img src={images[images.length - 1]} />
            {images.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img}
                  alt=""
                  id={`product__image--${index + 1}`}
                />
              );
            })}

            <img src={images[0]} alt="" id="first-clone" />
          </div>
        </div>
      </div>

      <div className="thumbnail-container">
        {thumbnailImages.map((img, index) => {
          return (
            <div key={index} className="overlay-thumbnail-background">
              <img
                id={`thumbnail-overlay-${index + 1}`}
                className="thumbnail thumbnail__current "
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
