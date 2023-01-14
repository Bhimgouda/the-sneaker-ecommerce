import React from "react";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className="collection container">
      <div className="collection__category">
        <Link to="/category/men">
          <p className="category-name">Men</p>
          <img src="/images/shoes/shoe-4-1.webp" alt="" />
        </Link>
      </div>
      <div className="collection__category">
        <Link to="/category/women">
          <p className="category-name">Women</p>
          <img src="/images/shoes/shoe-11-1.webp" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Collection;
