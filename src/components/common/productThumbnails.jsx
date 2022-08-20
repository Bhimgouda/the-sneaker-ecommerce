import React from "react";

const ProductThumbnails = () => {
  return (
    <div className="thumbnail-container">
      <img
        id="thumbnail-main-1"
        className="thumbnail thumbnail__current"
        src="./images/image-product-1-thumbnail.webp"
        alt=""
      />
      <img
        id="thumbnail-main-2"
        className="thumbnail"
        src="./images/image-product-2-thumbnail.webp"
        alt=""
      />
      <img
        id="thumbnail-main-3"
        className="thumbnail"
        src="./images/image-product-3-thumbnail.webp"
        alt=""
      />
      <img
        id="thumbnail-main-4"
        className="thumbnail"
        src="./images/image-product-4-thumbnail.webp"
        alt=""
      />
    </div>
  );
};

export default ProductThumbnails;
