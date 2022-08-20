import React, { useEffect, useState } from "react";
import productsData from "../products.json";
import { Link } from "react-router-dom";
import ProductInStore from "./productsInStore";

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsInStock = [...productsData];
    setProducts(productsInStock);
  }, []);
  return (
    <div className="store__product-gallery container">
      {products.map((product) => (
        <Link to={`product/${product._id}`}>
          <ProductInStore product={product} />
        </Link>
      ))}
    </div>
  );
};

export default Store;
