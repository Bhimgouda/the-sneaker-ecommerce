import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryHelper from "./../utils/categoryHelper";
import ProductInStore from "../components/productsInStore";
import axios from "axios";
import{ useSelector }from 'react-redux'
import { getProducts } from "../slices/productSlice";
import { useCallback } from "react";


const Store = () => {
  const [products, setProducts] = useState([])
  const productsInStock = [...useSelector(getProducts)];

  const {id} = useParams()

  useEffect(()=>{
    if(id){
      setProducts([...CategoryHelper(id, productsInStock)])
    }
    else{
      setProducts(productsInStock)
    }
  }, [id])

  const showProducts = products.length ? products : productsInStock

  return (
    <div className="store__product-gallery container">
      {showProducts.map((product) => (
        <Link key={product._id} to={`product/${product._id}`}>
          <ProductInStore product={product} />
        </Link>
      ))}
    </div>
  );
};



export default Store;
