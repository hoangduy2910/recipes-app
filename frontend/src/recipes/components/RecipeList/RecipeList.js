import React from "react";

import RecipeItem from "../RecipeItem/RecipeItem";
import "./RecipeList.css";

const RecipeList = (props) => {
  let recipes;

  if (props.recipes.length !== 0) {
    recipes = props.recipes.map((recipe, index) => {
      if (Object.keys(props.recipes).length === index + 1) {
        return (
          <RecipeItem
            key={index}
            recipeRef={props.lastRecipe}
            id={recipe.id || recipe._id}
            title={recipe.title}
            description={recipe.description}
            preparationTime={recipe.preparationTime}
            cookingTime={recipe.cookingTime}
            servings={recipe.servings}
            image={recipe.image}
          />
        );
      } else {
        return (
          <RecipeItem
            key={index}
            id={recipe.id || recipe._id}
            title={recipe.title}
            description={recipe.description}
            preparationTime={recipe.preparationTime}
            cookingTime={recipe.cookingTime}
            servings={recipe.servings}
            image={recipe.image}
          />
        );
      }
    });
  }

  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
