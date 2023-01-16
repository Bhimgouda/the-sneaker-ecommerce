import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ toggleValue, onNavLinkClick, activeLink }) => {
  const theNavLinks = [
    { label: "Collections", link: "/collections" },
    { label: "Men", link: "/category/men" },
    { label: "Women", link: "/category/women" },
    { label: "Today's Pick", link: "/product/63c51b360844b9350f40d3e0" },
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
