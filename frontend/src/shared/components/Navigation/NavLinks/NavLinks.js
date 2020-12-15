import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li className="nav-links__item">
        <NavLink to="/:id/recipes" exact>
          My Recipe
        </NavLink>
      </li>
      <li className="nav-links__item">
        <NavLink to="/recipe/new" exact>
          Add Recipe
        </NavLink>
      </li>
      <li className="nav-links__item">
        <NavLink to="/login" exact>
          Login
        </NavLink>
      </li>
      {/* <li className="nav-links__item">
        <NavLink to="/logout" exact>
          Logout
        </NavLink>
      </li> */}
    </ul>
  );
};

export default NavLinks;
