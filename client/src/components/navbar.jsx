import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./navbar Components/logo";
import Toggler from "./navbar Components/navbarToggler";
import NavLinks from "./navbar Components/navLinks";
import ProductCart from "./navbar Components/productCart";
import UserSection from "./navbar Components/userSection";

const Navbar = ({ handleCheckout, onDelete, productsInCart }) => {
  const [activeLink, setActiveLink] = useState("");
  const [toggleValue, setToggle] = useState(false);
  const [cartVisiblity, setCartVisiblity] = useState("hide");
  const [totalQuantity, setQuantity] = useState(0);

  const handleCartClick = () => {
    if (cartVisiblity === "hide") setCartVisiblity("show");
    else setCartVisiblity("hide");
  };

  const handleNavLinkClick = (link) => {
    const handleToggle = () => {
      if (toggleValue) setToggle(false);
      else setToggle(true);
    };
    handleToggle();
    const handleActive = (link) => {
      setActiveLink(link);
    };
    handleActive(link);
  };

  useEffect(() => {
    let quantity = 0;
    if (productsInCart.length > 0)
      productsInCart.forEach((p) => (quantity += p["itemsCount"]));
    setQuantity(quantity);
  }, [productsInCart]);

  return (
    <nav className="navbar navbar-container">
      <div className="nav__header">
        <Toggler toggleValue={toggleValue} onToggle={handleNavLinkClick} />
        <Logo />
        <NavLinks
          activeLink={activeLink}
          onNavLinkClick={handleNavLinkClick}
          toggleValue={toggleValue}
        />
      </div>
      <UserSection quantity={totalQuantity} onCartClick={handleCartClick} />
      <ProductCart
        onCheckout={handleCheckout}
        onDelete={onDelete}
        cartVisiblity={cartVisiblity}
        productsInCart={productsInCart}
      />
    </nav>
  );
};

export default Navbar;
