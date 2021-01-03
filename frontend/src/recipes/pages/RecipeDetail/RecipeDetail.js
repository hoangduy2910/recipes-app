import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ModalRecipe from "./ModalRecipe/ModalRecipe";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import Button from "../../../shared/components/UI/Button/Button";
import ReviewList from "../../../users/components/ReviewList/ReviewList";
import StarRating from "../../../shared/components/UI/StarRating/StarRating";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  const auth = useContext(AuthContext);
  const recipeId = useParams().recipeId;
  const history = useHistory();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [recipeDetail, setRecipeDetail] = useState();
  const [rating, setRating] = useState(0);

  const [isDelete, setIsDelete] = useState(false);
  const [isReview, setIsReview] = useState(false);

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

  const editRecipeHandler = useCallback(
    (id) => {
      history.push(`/recipe/new?recipeId=${id}`);
    },
    [history]
  );

  const deleteRecipeHandler = useCallback(async () => {
    setIsDelete(false);

    try {
      const response = await sendRequest(
        `/recipes/${recipeId}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      if (response.data.status === 200) {
        history.push(`/${auth.userId}/recipes`);
      }
    } catch (error) {}
  }, [recipeId, sendRequest, auth.token, auth.userId, history]);

  const showDeleteRecipeModalHandler = useCallback(() => {
    setIsDelete(true);
  }, []);

  const cancelDeleteRecipeModalHandler = useCallback(() => {
    setIsDelete(false);
  }, []);

  const showReviewModalHandler = useCallback(() => {
    setIsReview(true);
  }, []);

  const cancelReviewModalHandler = useCallback(() => {
    setIsReview(false);
  }, []);

  const addRatingAndReviewHandler = useCallback(() => {
    console.log("Submit !!!");
  }, []);

  const setRatingStar = useCallback((ratingStar) => {
    setRating(ratingStar);
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isDelete && (
        <ModalRecipe
          isShow={isDelete}
          header="Delete"
          onCancel={cancelDeleteRecipeModalHandler}
          submitText="Delete"
          onSubmit={deleteRecipeHandler}
          className="recipe-detail__modal"
          btnClass="recipe-detail__btn"
        >
          Do you want to delete recipe ?
        </ModalRecipe>
      )}
      {isLoading && <Spinner />}
      {!isLoading && recipeDetail && (
        <div className="recipe-detail">
          {auth.userId === recipeDetail.user.id && (
            <div className="recipe-detail__controllers">
              <Button
                outline
                onClick={() => editRecipeHandler(recipeDetail.id)}
              >
                Edit
              </Button>
              <Button outline onClick={() => showDeleteRecipeModalHandler()}>
                Delete
              </Button>
            </div>
          )}
          <div className="recipe-detail__info">
            <div className="recipe-detail__info-title">
              <h1>{recipeDetail.title}</h1>
            </div>
            <div className="recipe-detail__info-description">
              <p>{recipeDetail.description}</p>
            </div>
            <div className="recipe-detail__info-user">
              <img
                src={`http://localhost:5000/${recipeDetail.user.image}`}
                alt={recipeDetail.user.username}
              />
              <span>
                By{" "}
                <Link to={`/${recipeDetail.user._id}/recipes`}>
                  {recipeDetail.user.username}
                </Link>
              </span>
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
          <hr className="recipe-detail__cross" />
          <div className="recipe-detail__ingredients">
            <h2>Ingredients</h2>
            {recipeDetail.ingredients.map((ing, idx) => (
              <p key={idx}>{ing}</p>
            ))}
          </div>
          <hr className="recipe-detail__cross" />
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
          <hr className="recipe-detail__cross" />
          <div className="recipe-detail__reviews">
            <div className="recipe-detail__reviews-header">
              <h2>Reviews</h2>
              <Button type="button" outline onClick={showReviewModalHandler}>
                Add Rating & Review
              </Button>
              {isReview && (
                <ModalRecipe
                  isShow={isReview}
                  header="Rating & Review"
                  onCancel={cancelReviewModalHandler}
                  submitText="Submit"
                  onSubmit={addRatingAndReviewHandler}
                  className="recipe-detail__modal"
                  btnClass="recipe-detail__btn"
                >
                  <h2>{recipeDetail.title}</h2>
                  <StarRating
                    className="fa-2x recipe-detail__star"
                    isShow={false}
                    initialRating={rating}
                    onClick={setRatingStar}
                  />
                  <textarea
                    className="recipe-detail__review-form"
                    rows="5"
                    placeholder="What did you think about this recipe ?"
                  ></textarea>
                </ModalRecipe>
              )}
            </div>
            <div className="recipe-detail__reviews-body">
              <ReviewList />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default RecipeDetail;
