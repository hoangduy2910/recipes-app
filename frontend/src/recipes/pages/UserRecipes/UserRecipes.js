import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../shared/components/UI/Button/Button";
import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./UserRecipes.css";

const UserRecipes = (props) => {
  const userId = useParams().userId;
  const [recipes, setRecipes] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getRecipesByUserId = async () => {
      let response;
      try {
        response = await sendRequest(`/recipes/user/${userId}`, "GET");
        setRecipes(response.data.recipes);
      } catch (error) {}
    };
    getRecipesByUserId();
  }, [sendRequest, userId]);

  let userRecipes = (
    <div className="no-recipes">
      <h2>No recipes found. Maybe create one?</h2>
      <Button fill href="/recipe/new">
        Share Recipe
      </Button>
    </div>
  );

  if (recipes.length > 0) {
    userRecipes = <RecipeList recipes={recipes} />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && recipes && userRecipes}
    </React.Fragment>
  );
};

export default UserRecipes;
