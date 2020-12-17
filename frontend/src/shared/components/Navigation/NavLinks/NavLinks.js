import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../UI/Button/Button";
import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.userId && (
        <li className="nav-links__item">
          <NavLink to="/:id/recipes" exact>
            My Recipes
          </NavLink>
        </li>
      )}
      {auth.userId && (
        <li className="nav-links__item">
          <NavLink to="/recipe/new" exact>
            Add Recipe
          </NavLink>
        </li>
      )}
      {!auth.isLogin && (
        <li className="nav-links__item">
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      )}
      {auth.isLogin && (
        <li className="nav-links__item">
          <Button fill onClick={auth.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
