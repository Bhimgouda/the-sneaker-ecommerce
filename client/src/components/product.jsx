import React, { useEffect, useState } from "react";
import ProductImage from "./common/productImages";
import PricingPanel from "./common/pricingPanel";
import ProductInfo from "./common/productInfo";
import AddToCart from "./common/addToCart";
import { getProducts } from "../fakeDatabase";

import { useParams } from "react-router-dom";

const Product = (props) => {
  const { id: productId } = useParams();
  const product = [...getProducts()].find(
    (product) => product._id === productId
  );

  const { name, companyName, desc, originalPrice, discountedPrice, images } =
    product;

  return (
    <React.Fragment>
      <section className="product--main container">
        <div className="product__header">
          <ProductImage productImages={images} />
        </div>
        <div className="product__body">
          <ProductInfo name={name} desc={desc} companyName={companyName} />
          <PricingPanel
            originalPrice={originalPrice}
            discountedPrice={discountedPrice}
          />
          <AddToCart onATC={(itemsCount) => props.onATC(product, itemsCount)} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Product;
