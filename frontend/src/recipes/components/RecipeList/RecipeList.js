import React from "react";

import RecipeItem from "../RecipeItem/RecipeItem";
import "./RecipeList.css";

const DUMY_RECIPES = [
  {
    id: "r1",
    title: "Bruschetta with Beef Tartare",
    image:
      "https://i0.wp.com/demo.wpzoom.com/cookely/files/2012/12/victoria-shes-1054626-unsplash-1.jpg?resize=800%2C530&ssl=1",
  },
  {
    id: "r2",
    title: "Spaghetti with Garlic and Oil",
    image:
      "https://i2.wp.com/demo.wpzoom.com/cookely/files/2012/07/brooke-lark-176364-unsplash-1.jpg?w=800&ssl=1",
  },
  {
    id: "r3",
    title: "Sourdough Focaccia Bread",
    image:
      "http://www.myodessacuisine.com/wp-content/uploads/2020/12/focaccia-1140x1423.jpg",
  },
  {
    id: "r4",
    title: "Bruschetta with Beef Tartare",
    image:
      "https://i0.wp.com/demo.wpzoom.com/cookely/files/2012/12/victoria-shes-1054626-unsplash-1.jpg?resize=800%2C530&ssl=1",
  },
  {
    id: "r5",
    title: "Spaghetti with Garlic and Oil",
    image:
      "https://i2.wp.com/demo.wpzoom.com/cookely/files/2012/07/brooke-lark-176364-unsplash-1.jpg?w=800&ssl=1",
  },
  {
    id: "r6",
    title: "Sourdough Focaccia Bread",
    image:
      "http://www.myodessacuisine.com/wp-content/uploads/2020/12/focaccia-1140x1423.jpg",
  },
];

const RecipeList = (props) => {
  const recipes = DUMY_RECIPES.map((recipe, index) => (
    <RecipeItem key={index} title={recipe.title} image={recipe.image} />
  ));
  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
