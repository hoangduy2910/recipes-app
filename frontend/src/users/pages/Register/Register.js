import React from "react";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/FormElement/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import "./Register.css";

const Register = (props) => {
  const [formState, inputChangeHandler] = useForm(
    {
      register: {
        username: { value: "", isValid: false },
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
      },
    },
    false
  );

  let label, error, type, validator;

  const submitFormRegister = (event) => {
    event.preventDefault();
    console.log(formState.inputs.register);
  };

  const register = Object.keys(formState.inputs.register).map((itemId, idx) => {
    if (itemId === "username") {
      label = "Username";
      error = "username";
      type = "text";
      validator = VALIDATOR_REQUIRE();
    } else if (itemId === "email") {
      label = "Email";
      error = "email";
      type = "email";
      validator = VALIDATOR_EMAIL();
    } else { 
      label = "Password";
      error = "password (6 character)";
      type = "password";
      validator = VALIDATOR_MINLENGTH(6);
    } 

    return (
      <Input
        key={idx}
        id={itemId}
        element="input"
        type={type}
        label={label}
        validators={[validator]}
        initialValue={formState.inputs.register[itemId].value}
        errorText={`Please enter a valid ${error}.`}
        typeForm="register"
        onInput={inputChangeHandler}
      />
    );
  });

  return (
    <div className="form-register">
      <h1 className="form-register__header">Sign up</h1>
      <form className="form-register__body">
        {register}
        <Button
          fill
          fullWidth
          type="submit"
          disabled={!formState.isValid}
          onClick={submitFormRegister}
        >
          Register
        </Button>
      </form>
      <p className="form-register__footer">
        Already have an acount? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
