import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Input from "../../../shared/components/FormElement/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./Login.css";

const Login = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
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

  let label,
    type,
    errorText,
    validator = VALIDATOR_REQUIRE();
  const login = Object.keys(formState.inputs.login).map((itemId, idx) => {
    if (itemId === "email") {
      label = "Email";
      type = "email";
      errorText = "Please enter a valid email.";
    } else {
      label = "Password";
      type = "password";
      errorText = "Please enter a valid password.";
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
        errorText={errorText}
        typeForm="login"
        onInput={inputChangeHandler}
      />
    );
  });

  const submitFormLogin = async (event) => {
    event.preventDefault();

    let response;
    try {
      response = await sendRequest("/users/login", "POST", {
        email: formState.inputs.login.email.value,
        password: formState.inputs.login.password.value,
      });

      auth.login(response.data.userId, response.data.token);
      history.push("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="form-login">
          <h1 className="form-login__header">Login</h1>
          <form className="form-login__body">
            {login}
            <Button fill fullWidth type="submit" onClick={submitFormLogin}>
              Login
            </Button>
          </form>
          <p className="form-login__footer">
            Not register? <Link to="/register">Create an account</Link>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
