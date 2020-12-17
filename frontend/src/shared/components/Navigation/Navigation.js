import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader/MainHeader";
import NavLinks from "./NavLinks/NavLinks";
import "./Navigation.css";

const Navigation = (props) => {
  const [isShowNav, setIsShowNav] = useState(false);

  const showNavMenu = () => {
    setIsShowNav((prevIsShowNav) => !prevIsShowNav);
  };

  return (
    <MainHeader className="nav">
      <h1 className="nav-icon">
        <Link to="/">Your Recipe</Link>
      </h1>
      <nav className={`nav-menu ${isShowNav ? "show" : "hide"}`} onClick={showNavMenu}>
        <NavLinks />
      </nav>
      <div className="nav-btn" onClick={showNavMenu}>
        {isShowNav ? (
          <i className="fas fa-times fa-3x"></i>
        ) : (
          <i className="fas fa-bars fa-3x"></i>
        )}
      </div>
    </MainHeader>
  );
};

export default Navigation;
