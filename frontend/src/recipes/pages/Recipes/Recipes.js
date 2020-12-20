import React, { useState, useEffect } from "react";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const Recipes = (props) => {
  const [recipes, setRecipes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getRecipesByUserId = async () => {
      let response;
      try {
        response = await sendRequest(`/recipes`, "GET");
        setRecipes(response.data.recipes);
      } catch (error) {}
    };
    getRecipesByUserId();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && recipes && <RecipeList recipes={recipes} />}
    </React.Fragment>
  );
};

export default Recipes;
