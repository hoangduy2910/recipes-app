import React from "react";

import Button from "../../../shared/components/UI/Button/Button";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  return (
    <div className="recipe-item">
      <div >
        <img className="recipe-item__image" src={props.image} alt={props.title} />
      </div>
      <div className="recipe-item__info">
        <h2>{props.title}</h2>
        <Button ouline>View Recipe</Button>
      </div>
    </div>
  );
};

export default RecipeItem;
