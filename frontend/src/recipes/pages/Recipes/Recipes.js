import React, { useState, useEffect, useRef, useCallback } from "react";

import SpinnerDot from "../../../shared/components/UI/SpinnerDot/SpinnerDot";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import RecipeList from "../../components/RecipeList/RecipeList";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const LIMIT = 8;

const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const observer = useRef();
  const lastRecipeRef = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMorePage]
  );

  useEffect(() => {
    const getRecipesByUserId = async () => {
      let response;
      try {
        response = await sendRequest(
          `/recipes?page=${page}&limit=${LIMIT}`,
          "GET"
        );

        setRecipes((prevRecipes) => {
          if (prevRecipes) {
            setRecipes([...prevRecipes, ...response.data.recipes.results]);
          }
          return response.data.recipes.results;
        });
        setHasMorePage(response.data.recipes.hasMore);
      } catch (error) {}
    };

    getRecipesByUserId();

  }, [sendRequest, page]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <RecipeList recipes={recipes} lastRecipe={lastRecipeRef} />

      {isLoading && <SpinnerDot />}
    </React.Fragment>
  );
};

export default Recipes;
