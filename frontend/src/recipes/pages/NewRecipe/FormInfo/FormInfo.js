import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";
import { useForm } from "../../../../shared/hooks/form-hook";

const FormInfo = React.memo((props) => {
  const [formState, inputChangeHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  });

  const formInfo = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Infomation</span>
      </div>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputChangeHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description."
        onInput={inputChangeHandler}
      />
    </React.Fragment>
  );

  return formInfo;
});

export default FormInfo;
