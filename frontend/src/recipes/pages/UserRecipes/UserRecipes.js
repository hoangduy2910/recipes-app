import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Spinner from "../../../shared/components/UI/Spinner/Spinner";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const UserRecipes = (props) => {
  const userId = useParams().userId;
  const [recipes, setRecipes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getRecipesByUserId = async () => {
      let response;
      try {
        response = await sendRequest(`/recipes/user/${userId}`, "GET");
        console.log(response.data);
        setRecipes(response.data.recipes);
      } catch (error) {}
    };
    getRecipesByUserId();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Spinner />}
      {!isLoading && recipes && <RecipeList recipes={recipes} />}
    </React.Fragment>
  );
};

export default UserRecipes;
