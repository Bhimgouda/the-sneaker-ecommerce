import React, { useEffect, useState } from "react";
import productsData from "../products.json";
import { Link } from "react-router-dom";
import ProductInStore from "./productsInStore";
import CategoryHelper from "./../utils/categoryHelper";
import { getProducts } from "./../fakeDatabase";

const Store = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  let productsInStock = [...getProducts()];
  if (props.match.params.id) {
    const category = props.match.params.id;
    productsInStock = CategoryHelper(category, [...productsInStock]);
  }

  useEffect(() => {
    setProducts(productsInStock);
  }, [props]);

  let loadingClass = "loading";
  let className = "store__product-gallery container hide";
  if (!loading) {
    className = "store__product-gallery container";
    loadingClass = "loading hide";
  }

  return (
    <React.Fragment>
      <p className={loadingClass}>Loading...</p>
      <div className={className}>
        {products.map((product) => (
          <Link key={product._id} to={`product/${product._id}`}>
            <ProductInStore product={product} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Store;
