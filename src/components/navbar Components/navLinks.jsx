import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ toggleValue, closeNavbar }) => {
  return (
    <ul
      className={
        (toggleValue && "nav__links nav__links--expanded") || "nav__links"
      }
    >
      <li className="nav__link">
        <Link onClick={closeNavbar} to="/collections">
          Collections
        </Link>
      </li>
      <li className="nav__link">
        <Link onClick={closeNavbar} to="/category/men">
          Men
        </Link>
      </li>
      <li className="nav__link">
        <Link onClick={closeNavbar} to="/category/women">
          Women
        </Link>
      </li>
      <li className="nav__link">
        <Link onClick={closeNavbar} to="/product/p003">
          Today's Pick
        </Link>
      </li>
      <li className="nav__link">
        <Link onClick={closeNavbar} to="/about">
          About me
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
