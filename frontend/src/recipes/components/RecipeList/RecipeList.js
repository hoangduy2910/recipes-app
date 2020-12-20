import React from "react";

import RecipeItem from "../RecipeItem/RecipeItem";
import "./RecipeList.css";

const RecipeList = (props) => {
  let recipes;

  if (props.recipes) {
    recipes = props.recipes.map((recipe, index) => (
      <RecipeItem key={index} title={recipe.title} image={recipe.image} />
    ));
  }

  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
