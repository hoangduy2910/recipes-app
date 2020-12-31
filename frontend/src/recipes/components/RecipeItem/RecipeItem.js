import React from "react";
import { Link } from "react-router-dom";

import "./RecipeItem.css";

const RecipeItem = (props) => {
  return (
    <Link className="recipe-item" to={`/recipe/${props.id}`} ref={props.recipeRef}>
      <div className="recipe-item__image">
        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
      </div>
      <div className="recipe-item__info">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <div className="recipe-item__stats">
        <div className="recipe-item__stat">
          <div className="recipe-item__stat--value">
            {props.preparationTime}m
          </div>
          <div className="recipe-item__stat--name">Pre</div>
        </div>
        <div className="recipe-item__stat">
          <div className="recipe-item__stat--value">{props.cookingTime}m</div>
          <div className="recipe-item__stat--name">Cook</div>
        </div>
        <div className="recipe-item__stat">
          <div className="recipe-item__stat--value">{props.servings}</div>
          <div className="recipe-item__stat--name">Servings</div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeItem;
