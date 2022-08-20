import React from "react";

const PricingPanel = ({}) => {
  return (
    <div className="product__pricing-panel">
      <div>
        <span className="price product__discounted-price">125.00</span>
        <span className="product__discount">50%</span>
      </div>
      <span className="price product__original-price">250.00</span>
    </div>
  );
};

export default PricingPanel;
