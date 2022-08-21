import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductInStore from "./productsInStore";
import CategoryHelper from "./../utils/categoryHelper";
import { getProducts } from "./../fakeDatabase";

const Store = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productsInStock);
  }, [props]);

  let productsInStock = [...getProducts()];
  if (props.match.params.id) {
    const category = props.match.params.id;
    productsInStock = CategoryHelper(category, [...productsInStock]);
  }

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
