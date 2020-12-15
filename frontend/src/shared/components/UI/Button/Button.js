import React from "react";

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

  return (
    <button
      type={props.type}
      className={`btn ${classes.join(" ")}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
