import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryHelper from "./../utils/categoryHelper";
import { getProducts } from "./../fakeDatabase";
import ProductInStore from "./productsInStore";

const Store = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productsInStock);
  }, [useParams()]);

  let productsInStock = [...getProducts()];
  const { id: category } = useParams();
  if (category) {
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
