import React from "react";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/FormElement/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import "./Login.css";

const Login = (props) => {
  const [formState, inputChangeHandler] = useForm(
    {
      login: {
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
      },
    },
    false
  );

  let label, type, validator;

  const submitFormLogin = (event) => {
    event.preventDefault();
  };

  const login = Object.keys(formState.inputs.login).map((itemId, idx) => {
    if (itemId === "email") {
      label = "Email";
      type = "email";
      validator = VALIDATOR_EMAIL();
    } else {
      label = "Password";
      type = "password";
      validator = VALIDATOR_REQUIRE();
    }

    return (
      <Input
        key={idx}
        id={itemId}
        element="input"
        type={type}
        label={label}
        validators={[validator]}
        initialValue={formState.inputs.login[itemId].value}
        errorText={`Please enter a valid ${itemId}.`}
        typeForm="login"
        onInput={inputChangeHandler}
      />
    );
  });

  return (
    <div className="form-login">
      <h1 className="form-login__header">Login</h1>
      <form className="form-login__body">
        {login}
        <Button
          fill
          fullWidth
          type="submit"
          disabled={!formState.isValid}
          onClick={submitFormLogin}
        >
          Login
        </Button>
      </form>
      <p className="form-login__footer">
        Not register? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
