import React from "react";
import ProductImage from "./common/productImages";
import PricingPanel from "./common/pricingPanel";

const ProductInStore = ({ product }) => {
  const { name, images, originalPrice, discountedPrice, discountPercentage } =
    product;

  return (
    <div className="store__product">
      <div className="product__image">
        <img src={images[0]} alt="" />
      </div>
      <h1 className="product__company">{name}</h1>
      <PricingPanel />
    </div>
  );
};

export default ProductInStore;
