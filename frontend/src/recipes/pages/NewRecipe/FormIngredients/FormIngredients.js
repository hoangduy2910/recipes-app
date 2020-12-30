import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";

const FormIngredients = (props) => {
  const ingredients = Object.keys(props.data).map((itemId, idx) => {
    if (
      props.noController ||
      idx !== Object.keys(props.data).length - 1 ||
      idx === 0
    ) {
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
    } else {
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
          removeElement={() => props.removeIngredient(itemId, props.data[itemId].isValid, "ingredients")}
        />
      );
    }
  });

  const formIngredients = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Ingredients</span>
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
