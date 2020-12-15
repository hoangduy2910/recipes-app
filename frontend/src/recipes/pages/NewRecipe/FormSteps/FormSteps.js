import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";

const FormIngredients = (props) => {
  const steps = Object.keys(props.data).map((itemId, idx) => {
    if (props.noController) {
      return (
        <Input
          key={idx}
          id={itemId}
          label={`Step ${idx + 1}`}
          element="input"
          type="text"
          errorText="Please enter a valid step."
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={props.data[itemId].value}
          typeForm="steps"
          onInput={props.inputChange}
        />
      );
    }

    return (
      <Input
        key={idx}
        id={itemId}
        label={`Step ${idx + 1}`}
        element="input"
        type="text"
        errorText="Please enter a valid step."
        removeInput
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={props.data[itemId].value}
        typeForm="steps"
        onInput={props.inputChange}
        removeElement={() => props.removeStep(itemId, "steps")}
      />
    );
  });

  const formSteps = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Steps</span>
        {!props.noController && <i
          className="fas fa-plus-circle fa-2x"
          onClick={() => props.addStep("steps")}
        />}
      </div>
      {steps}
    </React.Fragment>
  );

  return formSteps;
};

export default FormIngredients;
