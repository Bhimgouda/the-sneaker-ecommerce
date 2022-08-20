import React, { useEffect, useState } from "react";
import ProductImage from "./common/productImages";
import ProductThumbnails from "./common/productThumbnails";
import PricingPanel from "./common/pricingPanel";
import ProductInfo from "./common/productInfo";
import AddToCart from "./common/addToCart";
import products from "../products.json";

const Product = (props) => {
  const productId = props.match.params.id;
  const product = products.find((product) => product._id === productId);

  const { name, companyName, desc } = product;

  return (
    <section className="product--main container">
      <div className="product__header">
        <ProductImage productImages={product.images} />
        <ProductThumbnails thumbnailImages={product.thumbnailImages} />
      </div>
      <div className="product__body">
        <ProductInfo name={name} desc={desc} companyName={companyName} />
        <PricingPanel />
        <AddToCart />
      </div>
    </section>
  );
};

export default Product;
