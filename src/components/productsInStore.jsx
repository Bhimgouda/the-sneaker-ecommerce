import React from "react";
import PricingPanel from "./common/pricingPanel";

export default ({ product }) => {
  const { name, images, originalPrice, discountedPrice } = product;

  return (
    <div className="store__product">
      <div className="product__image">
        <img src={images[0]} alt="" />
      </div>
      <h1 className="product__company">{name}</h1>
      <PricingPanel
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
      />
    </div>
  );
};
