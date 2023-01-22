import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../slices/productSlice";

const NavLinks = ({ toggleValue, onNavLinkClick, activeLink }) => {

  const products = [...useSelector(getProducts)]
  const randomNum = Math.floor(Math.random()*(products.length-1 - 0 + 1));
  const product = products[randomNum] && products[randomNum]._id

  const theNavLinks = [
    { label: "Collections", link: "/collections" },
    { label: "Men", link: "/category/men" },
    { label: "Women", link: "/category/women" },
    { label: "Today's Pick", link: `/product/${product}` },
    { label: "About me", link: "/about" },
  ];
  return (
    <ul
      className={
        (toggleValue && "nav__links nav__links--expanded") || "nav__links"
      }
    >
      {theNavLinks.map((link, index) => (
        <li key={index} className={link.label === activeLink ? "active" : ""}>
          <a onClick={() => onNavLinkClick(link.label, link.link)} >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
