import React from "react";

const ProductInfo = ({ desc, name, companyName }) => {
  return (
    <div className="product__info">
      <p className="product__company">{companyName}</p>
      <h1 className="product__title">{name}</h1>
      <p className="product__description">{desc}</p>
    </div>
  );
};

export default ProductInfo;
