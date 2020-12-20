import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader/MainHeader";
import NavLinks from "./NavLinks/NavLinks";
import Backdrop from "../UI/Backdrop/Backdrop";
import "./Navigation.css";

const Navigation = (props) => {
  const [isShowNav, setIsShowNav] = useState(false);

  const showNavMenu = () => {
    setIsShowNav((prevIsShowNav) => !prevIsShowNav);
  };

  const closeNavMenu = () => {
    setIsShowNav(false);
  };

  return (
    <React.Fragment>
      {isShowNav && <Backdrop onClick={showNavMenu} />}

      <MainHeader className="nav">
        <h1 className="nav__icon">
          <Link to="/">Your Recipe</Link>
        </h1>
        <nav className={`nav__menu ${isShowNav ? "show" : "hide"}`}>
          <NavLinks onClick={closeNavMenu} />
        </nav>
        <div className="nav__btn" onClick={showNavMenu}>
          <i className="fas fa-bars fa-3x"></i>
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default Navigation;
