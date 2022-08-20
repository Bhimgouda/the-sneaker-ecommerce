import React, { useEffect, useState } from "react";
import productsData from "../products.json";
import { Link } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsInStock = [...productsData];
    setProducts(productsInStock);
  }, []);
  return (
    <div>
      <h1>store</h1>
      {products.map((product, index) => {
        return (
          <div key={index}>
            <Link to={`product/${product._id}`}>Shoes{index}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Store;
