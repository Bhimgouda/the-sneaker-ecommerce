import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ toggleValue }) => {
  return (
    <ul
      className={
        (toggleValue && "nav__links nav__links--expanded") || "nav__links"
      }
    >
      <li>
        <Link to="/collections">Collections</Link>
      </li>
      <li>
        <Link to="/category/men">Men</Link>
      </li>
      <li>
        <Link to="/category/women">Women</Link>
      </li>
      <li>
        <Link to="/product/p001">Today's Pick</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
