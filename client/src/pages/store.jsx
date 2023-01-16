import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryHelper from "./../utils/categoryHelper";
import ProductInStore from "../components/productsInStore";
import axios from "axios";
import{ useSelector }from 'react-redux'
import { getProducts } from "../slices/productSlice";


const Store = () => {

  const products = useSelector(getProducts);

  return (
    <div className="store__product-gallery container">
      {products.map((product) => (
        <Link key={product._id} to={`product/${product._id}`}>
          <ProductInStore product={product} />
        </Link>
      ))}
    </div>
  );
};

export default Store;
