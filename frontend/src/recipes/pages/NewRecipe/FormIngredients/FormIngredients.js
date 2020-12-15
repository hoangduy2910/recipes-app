import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";

const FormIngredients = (props) => {
  const ingredients = Object.keys(props.data).map((itemId, idx) => {
    if (props.noController) {
      return (
        <Input
          key={idx}
          id={itemId}
          label={`Ingredient ${idx + 1}`}
          element="input"
          type="text"
          errorText="Please enter a valid ingredient."
          validators={[VALIDATOR_REQUIRE()]}
          initialValue={props.data[itemId].value}
          typeForm="ingredients"
          onInput={props.inputChange}
        />
      );
    }

    return (
      <Input
        key={idx}
        id={itemId}
        label={`Ingredient ${idx + 1}`}
        element="input"
        type="text"
        errorText="Please enter a valid ingredient."
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={props.data[itemId].value}
        typeForm="ingredients"
        onInput={props.inputChange}
        removeInput
        removeElement={() => props.removeIngredient(itemId, "ingredients")}
      />
    );
  });

  const formIngredients = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Ingredient</span>
        {!props.noController && (
          <i
            className="fas fa-plus-circle fa-2x"
            onClick={() => props.addIngredient("ingredients")}
          />
        )}
      </div>
      {ingredients}
    </React.Fragment>
  );

  return formIngredients;
};

export default FormIngredients;
