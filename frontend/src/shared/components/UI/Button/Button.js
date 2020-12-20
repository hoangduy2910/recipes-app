import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  let classes = [];

  if (props.ouline) {
    classes.push("btn--ouline");
  } else if (props.fill) {
    classes.push("btn--fill");
  }

  if (props.disabled) {
    classes.push("btn--disabled");
  }

  if (props.fullWidth) {
    classes.push("btn--full-width");
  }
  
  let button = (
    <button
      type={props.type}
      className={`btn ${classes.join(" ")}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );

  if (props.href) {
    button = (
      <Link to={props.href} className={`btn ${classes.join(" ")}`}>
        {props.children}
      </Link>
    );
  }

  return button;
};

export default Button;
