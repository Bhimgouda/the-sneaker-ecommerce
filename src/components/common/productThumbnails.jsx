import React from "react";

const ProductThumbnails = ({ thumbnailImages }) => {
  return (
    <div className="thumbnail-container">
      {thumbnailImages.map((image, index) => {
        return (
          <img
            id={`thumbnail-main-${index + 1}`}
            className="thumbnail"
            src={image}
            alt=""
          />
        );
      })}
    </div>
  );
};

export default ProductThumbnails;
