import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./navbar Components/logo";
import Toggler from "./navbar Components/navbarToggler";
import NavLinks from "./navbar Components/navLinks";
import UserProfile from "./navbar Components/userProfile";
import UserSection from "./navbar Components/userSection";

const Navbar = () => {
  const navigate = useNavigate()
  const [activeLink, setActiveLink] = useState("");
  const [toggleValue, setToggle] = useState(false);

  const handleNavLinkClick = (label, link) => {
    const handleToggle = () => {
      if (toggleValue) setToggle(false);
      else setToggle(true);
    };
    
    handleToggle();
    
    const handleActive = (label) => {
      setActiveLink(label);
    };
    handleActive(label);

    return navigate(link)
  };


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
      <UserSection />
      <UserProfile />
    </nav>
  );
};

export default Navbar;
