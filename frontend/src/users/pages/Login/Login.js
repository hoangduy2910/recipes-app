import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/FormElement/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./Login.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputChangeHandler] = useForm(
    {
      login: {
        email: { value: "", isValid: false },
        password: { value: "", isValid: false },
      },
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let label, type, validator;
  const login = Object.keys(formState.inputs.login).map((itemId, idx) => {
    if (itemId === "email") {
      label = "Email";
      type = "email";
      validator = VALIDATOR_EMAIL();
    } else {
      label = "Password";
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
        initialValue={formState.inputs.login[itemId].value}
        errorText={`Please enter a valid ${itemId}.`}
        typeForm="login"
        onInput={inputChangeHandler}
      />
    );
  });

  const submitFormLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", formState.inputs.login.email);
    formData.append("password", formState.inputs.login.password);

    let response;
    try {
      response = await sendRequest("users/login", "POST", formData);
      console.log(response.data);
    } catch (error) {}

    // auth.login(response.data.userId);
  };

  return (
    <div className="form-login">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Login;
