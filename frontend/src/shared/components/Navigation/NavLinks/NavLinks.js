import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../UI/Button/Button";
import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links" onClick={props.onClick}>
      <li className="nav-links__item">
          <NavLink to={`/`}>
            Recipes
          </NavLink>
        </li>
      {auth.userId && (
        <li className="nav-links__item">
          <NavLink to={`/${auth.userId}/recipes`}>
            My Recipes
          </NavLink>
        </li>
      )}
      {auth.userId && (
        <li className="nav-links__item">
          <NavLink to="/recipe/new">
            Add Recipe
          </NavLink>
        </li>
      )}
      {!auth.isLogin && (
        <li className="nav-links__item--fill">
          <Button fill href="/login">
            Login
          </Button>
        </li>
      )}
      {auth.isLogin && (
        <li className="nav-links__item--fill">
          <Button fill onClick={auth.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
