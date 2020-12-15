import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";
import { useForm } from "../../../../shared/hooks/form-hook";

const FormIngredients = (props) => {
  const [formState, inputChangeHandler, inputAddHandler] = useForm({
    step1: { value: "", isValid: false },
  });

  const addStepHandler = () => {
    let newStep = Object.keys(formState.inputs).length;
    newStep = (newStep + 1).toString();
    inputAddHandler("step" + newStep);
  };

  const steps = Object.keys(formState.inputs).map((step, idx) => {
    return (
      <Input
        key={idx}
        id={`step${idx + 1}`}
        label={`Step ${idx + 1}`}
        element="input"
        type="text"
        errorText="Please enter a valid step."
        removeInput
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs[step].value}
      />
    );
  });

  const formSteps = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Steps</span>
        <i className="fas fa-plus-circle fa-2x" onClick={addStepHandler}></i>
      </div>
      {steps}
    </React.Fragment>
  );

  return formSteps;
};

export default FormIngredients;
