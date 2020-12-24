import React from "react";
import Button from "../../../shared/components/UI/Button/Button";

import RecipeItem from "../RecipeItem/RecipeItem";
import "./RecipeList.css";

const RecipeList = (props) => {
  let recipes;

  if (props.recipes.length !== 0) {
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
  } else {
    recipes = (
      <div className="no-recipes">
        <h2>No recipes found. Maybe create one?</h2>
        <Button fill href="/recipe/new">Share Recipe</Button>
      </div>
    );
  }

  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
