import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./navbar Components/logo";
import Toggler from "./navbar Components/navbarToggler";
import NavLinks from "./navbar Components/navLinks";
import ProductCart from "./navbar Components/productCart";
import UserSection from "./navbar Components/userSection";

const Navbar = () => {
  const [toggleValue, setToggle] = useState(false);

  const handleToggle = () => {
    if (toggleValue) setToggle(false);
    else setToggle(true);
  };

  return (
    <nav className="navbar navbar-container">
      <div className="nav__header">
        <Toggler toggleValue={toggleValue} onToggle={handleToggle} />
        <Logo />
        <NavLinks toggleValue={toggleValue} />
      </div>
      <UserSection />
      <ProductCart />
    </nav>
  );
};

export default Navbar;
