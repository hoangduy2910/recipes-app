import React from "react";

import Input from "../../../../shared/components/FormElement/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../../shared/utils/validators";
import { useForm } from "../../../../shared/hooks/form-hook";

const FormIngredients = (props) => {
  const [
    formState,
    inputChangeHandler,
    inputAddHandler,
    inputRemoveHandler,
  ] = useForm({
    ing1: { value: "", isValid: false },
  });

  const addIngredientHandler = () => {
    let newIng = Object.keys(formState.inputs).length;
    newIng = (newIng + 1).toString();
    inputAddHandler("ing" + newIng);
  };

  const removeIngredientHandler = (id) => {
    inputRemoveHandler(id);
  };

  const ingredients = Object.keys(formState.inputs).map((ing, idx) => {
    return (
      <Input
        key={idx}
        id={`ing${idx + 1}`}
        label={`Ingredient ${idx + 1}`}
        element="input"
        type="text"
        errorText="Please enter a valid ingredient."
        removeInput
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs[ing].value}
        onInput={inputChangeHandler}
        removeElement={() => removeIngredientHandler(idx)}
      />
    );
  });

  const formIngredients = (
    <React.Fragment>
      <div className="new-recipe-form__title">
        <span>Ingredient</span>
        <i
          className="fas fa-plus-circle fa-2x"
          onClick={addIngredientHandler}
        />
      </div>
      {ingredients}
    </React.Fragment>
  );

  return formIngredients;
};

export default FormIngredients;
