import React from "react";

const Toggler = ({ onToggle, toggleValue }) => {
  return (
    <div
      onClick={onToggle}
      className={
        (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
      }
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Toggler;
