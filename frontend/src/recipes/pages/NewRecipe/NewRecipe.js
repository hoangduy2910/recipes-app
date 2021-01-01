import React, { useState, useEffect, useCallback, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

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
  const history = useHistory();
  const recipeId = useLocation().search.split("=")[1];

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formCount, setFormCount] = useState(1);
  const [isCreated, setIsCreated] = useState(true);

  const {
    formState,
    inputChangeHandler,
    inputAddHandler,
    inputRemoveHandler,
    setFormData,
  } = useForm(
    {
      info: {},
      ingredients: {},
      steps: {},
    },
    false
  );

  useEffect(() => {
    try {
      if (recipeId) {
        const getRecipeById = async () => {
          const response = await sendRequest(`/recipes/${recipeId}`, "GET");

          if (response.data.recipe) {
            const recipe = response.data.recipe;

            const infoData = {
              title: {
                value: recipe.title,
                isValid: true,
              },
              description: {
                value: recipe.description,
                isValid: true,
              },
              preparationTime: {
                value: recipe.preparationTime,
                isValid: true,
              },
              cookingTime: {
                value: recipe.cookingTime,
                isValid: true,
              },
              servings: {
                value: recipe.servings,
                isValid: true,
              },
            };

            const ingredientsData = {};
            recipe.ingredients.map((ing, idx) => {
              return (ingredientsData[`ingredient${idx + 1}`] = {
                value: ing,
                isValid: true,
              });
            });

            const stepsData = {};
            recipe.steps.map((step, idx) => {
              return (stepsData[`step${idx + 1}`] = {
                value: step,
                isValid: true,
              });
            });

            setFormData(
              {
                info: infoData,
                ingredients: ingredientsData,
                steps: stepsData,
              },
              true
            );

            setIsCreated(false);
          }
        };

        getRecipeById();
      } else {
        setFormData(
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
      }
    } catch (error) {}
  }, [recipeId, sendRequest, setFormData]);

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
    (id, isValid, typeForm) => {
      inputRemoveHandler(id, isValid, typeForm);
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

    const ingredients = [];
    for (const ingId in formState.inputs.ingredients) {
      ingredients.push(formState.inputs.ingredients[ingId].value);
    }
    const steps = [];
    for (const stepId in formState.inputs.steps) {
      steps.push(formState.inputs.steps[stepId].value);
    }

    try {
      if (isCreated) {
        const image = formState.inputs.info.image.value;

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

        const response = await sendRequest("/recipes", "POST", formData, {
          Authorization: `Bearer ${auth.token}`,
        });
        if (response.data) {
          history.push(`/${auth.userId}/recipes`);
        }
      } else {
        const formUpdate = {
          title: title,
          description: description,
          preparationTime: preparationTime,
          cookingTime: cookingTime,
          servings: servings,
          ingredients: ingredients,
          steps: steps,
          userId: auth.userId,
        };

        const response = await sendRequest(
          `/recipes/${recipeId}`,
          "PATCH",
          formUpdate,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        if (response.data) {
          history.push(`/recipe/${recipeId}`);
        }
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
                {isCreated ? "Add Recipe" : "Update Recipe"}
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
