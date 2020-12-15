import React, { useState, useCallback } from "react";

import FormInfo from "./FormInfo/FormInfo";
import FormIngredients from "./FormIngredients/FormIngredients";
import FormSteps from "./FormSteps/FormSteps";
import Button from "../../../shared/components/UI/Button/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import "./NewRecipe.css";

const NewRecipe = (props) => {
  const [formCount, setFormCount] = useState(1);
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
        newInput = Object.keys(formState.inputs.ingredients).length + 1;
        inputAddHandler(`ingredient${newInput}`, "ingredients");
      } else {
        newInput = Object.keys(formState.inputs.steps).length + 1;
        inputAddHandler(`step${newInput}`, "steps");
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
    console.log(formState);
  };

  console.log(`FormCount: ${formCount > 3}, FormState: ${formState.isValid}`);

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
              fullWitdh
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