import React from "react";

import RecipeItem from "../RecipeItem/RecipeItem";
import "./RecipeList.css";

const RecipeList = (props) => {
  let recipes;

  if (props.recipes) {
    recipes = props.recipes.map((recipe, index) => (
      <RecipeItem
        key={index}
        id={recipe.id}
        title={recipe.title}
        description={recipe.description}
        preparationTime={recipe.preparationTime}
        cookingTime={recipe.cookingTime}
        servings={recipe.servings}
        image={recipe.image}
      />
    ));
  }

  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
