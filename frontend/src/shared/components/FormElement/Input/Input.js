import React, { useReducer, useEffect } from "react";

import { validate } from "../../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: !!props.initialValue || false,
    isTouch: !!props.initialValue || false,
  });

  const { id, onInput, typeForm } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid, typeForm);
  }, [id, value, isValid, onInput, typeForm]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  let element;
  if (props.element === "input") {
    if (props.type === "number") {
      element = (
        <input
          id={props.id}
          type={props.type}
          min={1}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    } else {
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
    }
  } else {
    element = (
      <textarea
        id={props.id}
        row={props.row || 5}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  }

  return (
    <div className="input-element">
      <div className="input-element__title">
        <label htmlFor={props.id}>{props.label}</label>
        {props.removeInput && (
          <i
            className="fas fa-minus-circle fa-2x"
            onClick={props.removeElement}
          />
        )}
      </div>
      {element}
      {!inputState.isValid && inputState.isTouch && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
