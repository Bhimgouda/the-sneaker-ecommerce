import React, { useEffect, useState } from "react";
import ProductImage from "../components/common/productImages";
import PricingPanel from "../components/common/pricingPanel";
import ProductInfo from "../components/common/productInfo";
import AddToCart from "../components/common/addToCart";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/productSlice";
import { addTocart } from "../slices/cartSlice";

const Product = (props) => {
  const dispatch = useDispatch()
  const products = useSelector(getProducts)
  const { id: productId } = useParams();

  const product = [...products].find((p) => p._id === productId
  );

  const handleAddToCart = (itemsCount)=>{
    dispatch(addTocart({...product, quantity: itemsCount}))
  }

  const { name, companyName, desc, originalPrice, discountedPrice, images } = {...product};

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
          <AddToCart onATC={handleAddToCart} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Product;
