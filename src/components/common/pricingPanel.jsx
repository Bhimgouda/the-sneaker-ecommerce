import React from "react";

const PricingPanel = ({ originalPrice, discountedPrice }) => {
  let value = (discountedPrice / originalPrice) * 100;
  let discountPercentage = Math.ceil(100 - value);

  return (
    <div className="product__pricing-panel">
      <div>
        <span className="price product__discounted-price">
          {discountedPrice}
        </span>
        <span className="product__discount">{discountPercentage + "%"}</span>
      </div>
      <span className="price product__original-price">{originalPrice}</span>
    </div>
  );
};

export default PricingPanel;
