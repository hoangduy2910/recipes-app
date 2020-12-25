import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Input from "../../../shared/components/FormElement/Input/Input";
import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/utils/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./Register.css";

const Register = (props) => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const submitFormRegister = async (event) => {
    event.preventDefault();

    try {
      const formData = {
        username: formState.inputs.register.username.value,
        email: formState.inputs.register.email.value,
        password: formState.inputs.register.password.value,
      };

      const response = await sendRequest("/users/register", "POST", formData);

      if (response.data.user) {
        history.push("/login");
      }
    } catch (error) {}
  };

  let label, errorText, type, validator;
  const register = Object.keys(formState.inputs.register).map((itemId, idx) => {
    if (itemId === "username") {
      label = "Username";
      errorText = "username";
      type = "text";
      validator = VALIDATOR_REQUIRE();
    } else if (itemId === "email") {
      label = "Email";
      errorText = "email";
      type = "email";
      validator = VALIDATOR_EMAIL();
    } else {
      label = "Password";
      errorText = "password (6 character)";
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
        errorText={`Please enter a valid ${errorText}.`}
        typeForm="register"
        onInput={inputChangeHandler}
      />
    );
  });

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && (
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
      )}
    </React.Fragment>
  );
};

export default Register;
