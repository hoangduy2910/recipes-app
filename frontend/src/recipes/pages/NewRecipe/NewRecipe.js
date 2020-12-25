import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import FormInfo from "./FormInfo/FormInfo";
import FormIngredients from "./FormIngredients/FormIngredients";
import FormSteps from "./FormSteps/FormSteps";
import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./NewRecipe.css";

const NewRecipe = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
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
        preparationTime: {
          value: 1,
          isValid: true,
        },
        cookingTime: {
          value: 1,
          isValid: true,
        },
        servings: {
          value: 1,
          isValid: true,
        },
        image: {
          value: null,
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
            Object.keys(formState.inputs.steps).slice(-1)[0].split("step")[1]
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

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const title = formState.inputs.info.title.value;
    const description = formState.inputs.info.description.value;
    const preparationTime = formState.inputs.info.preparationTime.value;
    const cookingTime = formState.inputs.info.cookingTime.value;
    const servings = formState.inputs.info.servings.value;
    const image = formState.inputs.info.image.value;
    const ingredients = [];
    for (const ingId in formState.inputs.ingredients) {
      ingredients.push(formState.inputs.ingredients[ingId].value);
    }
    const steps = [];
    for (const stepId in formState.inputs.steps) {
      steps.push(formState.inputs.steps[stepId].value);
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("preparationTime", preparationTime);
      formData.append("cookingTime", cookingTime);
      formData.append("servings", servings);
      formData.append("image", image);
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("steps", JSON.stringify(steps));
      formData.append("userId", auth.userId);

      const response = await sendRequest("/recipes", "POST", formData);

      if (response.data) {
        history.push(`/${auth.userId}/recipes`);
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && (
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
                disabled={!formState.isValid}
              >
                Add Recipe
              </Button>
            </React.Fragment>
          )}
          <div className="new-recipe-form__controls">
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
              disabled={
                !formState.isValid || (formCount === 4 && formState.isValid)
              }
            >
              Next
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default NewRecipe;
