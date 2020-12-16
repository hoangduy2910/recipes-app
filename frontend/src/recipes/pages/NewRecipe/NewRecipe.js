import React, { useState, useCallback } from "react";

import FormInfo from "./FormInfo/FormInfo";
import FormIngredients from "./FormIngredients/FormIngredients";
import FormSteps from "./FormSteps/FormSteps";
import Button from "../../../shared/components/UI/Button/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import "./NewRecipe.css";

const NewRecipe = (props) => {
  const [formCount, setFormCount] = useState(2);
  const [
    formState,
    inputChangeHandler,
    inputAddHandler,
    inputRemoveHandler,
  ] = useForm(
    {
      info: {
        title: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },
      },
      ingredients: {
        ingredient1: { value: "", isValid: false },
      },
      steps: {
        step1: { value: "", isValid: false },
      },
    },
    false
  );

  const nextHandler = () => {
    setFormCount(formCount + 1);
  };

  const backHandler = () => {
    setFormCount(formCount - 1);
  };

  const addInputHandler = useCallback(
    (typeForm) => {
      let newInput;

      if (typeForm === "ingredients") {
        newInput =
          parseInt(
            Object.keys(formState.inputs.ingredients)
              .slice(-1)[0]
              .split("ingredient")[1]
          ) + 1;
        inputAddHandler(`ingredient${newInput.toString()}`, "ingredients");
      } else {
        newInput =
          parseInt(
            Object.keys(formState.inputs.steps)
              .slice(-1)[0]
              .split("ingredient")[1]
          ) + 1;
        inputAddHandler(`step${newInput.toString()}`, "steps");
      }
    },
    [formState.inputs.ingredients, formState.inputs.steps, inputAddHandler]
  );

  const removeInputHandler = useCallback(
    (id, typeForm) => {
      inputRemoveHandler(id, typeForm);
    },
    [inputRemoveHandler]
  );

  const submitFormHandler = (event) => {
    event.preventDefault();
  };

  console.log(formState.inputs.ingredients);

  return (
    <React.Fragment>
      <form className="new-recipe-form">
        {formCount === 1 && (
          <FormInfo
            data={formState.inputs.info}
            inputChange={inputChangeHandler}
          />
        )}
        {formCount === 2 && (
          <FormIngredients
            data={formState.inputs.ingredients}
            inputChange={inputChangeHandler}
            addIngredient={addInputHandler}
            removeIngredient={removeInputHandler}
          />
        )}
        {formCount === 3 && (
          <FormSteps
            data={formState.inputs.steps}
            inputChange={inputChangeHandler}
            addStep={addInputHandler}
            removeStep={removeInputHandler}
          />
        )}
        {formCount === 4 && (
          <React.Fragment>
            <FormInfo
              data={formState.inputs.info}
              inputChange={inputChangeHandler}
            />
            <FormIngredients
              data={formState.inputs.ingredients}
              inputChange={inputChangeHandler}
              noController
            />
            <FormSteps
              data={formState.inputs.steps}
              inputChange={inputChangeHandler}
              noController
            />
            <Button
              fill
              fullWidth
              type="submit"
              onClick={(event) => submitFormHandler(event)}
            >
              Add Recipe
            </Button>
          </React.Fragment>
        )}
        <Button
          type="button"
          fill
          onClick={backHandler}
          disabled={formCount < 2}
        >
          Back
        </Button>
        <Button
          type="button"
          fill
          onClick={nextHandler}
          disabled={!(formCount > 3) && !formState.isValid}
        >
          Next
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
