import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  const recipeId = useParams().recipeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [recipeDetail, setRecipeDetail] = useState();

  useEffect(() => {
    try {
      const getRecipeById = async () => {
        const response = await sendRequest(`/recipes/${recipeId}`, "GET");

        if (response.data) {
          setRecipeDetail(response.data.recipe);
        }
      };

      getRecipeById();
    } catch (error) {}
  }, [recipeId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && recipeDetail && (
        <div className="recipe-detail">
          <div className="recipe-detail__info">
            <div className="recipe-detail__info-title">
              <h1>{recipeDetail.title}</h1>
            </div>
            <div className="recipe-detail__info-description">
              <p>{recipeDetail.description}</p>
            </div>
            <div className="recipe-detail__info-image">
              <img
                src={`http://localhost:5000/${recipeDetail.image}`}
                alt={recipeDetail.title}
              />
            </div>
            <div className="recipe-detail__info-sub">
              <div>
                <i className="far fa-clock fa-2x"></i>
              </div>
              <div>
                <strong>Prep: </strong>
                <span>{recipeDetail.preparationTime} mins</span>
              </div>
              <div>
                {" "}
                <strong>Cook: </strong>
                <span>{recipeDetail.cookingTime} mins</span>
              </div>
              <div>
                <strong>Total: </strong>
                <span>
                  {(
                    parseInt(recipeDetail.preparationTime) +
                    parseInt(recipeDetail.cookingTime)
                  ).toString()}
                  mins
                </span>
              </div>
              <div>
                <strong>Servings: </strong>
                <span>{recipeDetail.servings}</span>
              </div>
            </div>
          </div>
          <div className="recipe-detail__ingredients">
            <h2>Ingredients</h2>
            {recipeDetail.ingredients.map((ing, idx) => (
              <p key={idx}>{ing}</p>
            ))}
          </div>
          <div className="recipe-detail__steps">
            <h2>Steps</h2>
            {recipeDetail.steps.map((step, idx) => (
              <div key={idx} className="recipe-detail__step">
                <div>
                  <i className="fas fa-check-circle" />
                  <span>Step {idx + 1}</span>
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RecipeDetail;
