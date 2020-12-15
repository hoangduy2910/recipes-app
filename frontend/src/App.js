import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navigation";
import Login from "./users/pages/Login/Login";
import Register from "./users/pages/Register/Register";
import Recipes from "./recipes/pages/Recipes/Recipes";
import UserRecipes from "./recipes/pages/UserRecipes/UserRecipes";
import NewRecipe from "./recipes/pages/NewRecipe/NewRecipe";
import "./App.css";

const App = (props) => {
  let routes = (
    <Switch>
      <Route path="/" exact>
        <Recipes />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/:userId/recipe">
        <UserRecipes />
      </Route>
      <Route path="/recipe/new">
        <NewRecipe />
      </Route>
    </Switch>
  );

  return (
    <Router>
      <Navigation />
      <main className="main">{routes}</main>
    </Router>
  );
};

export default App;
