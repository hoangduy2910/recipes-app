import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navigation";
import Login from "./users/pages/Login/Login";
import Register from "./users/pages/Register/Register";
import Recipes from "./recipes/pages/Recipes/Recipes";
import UserRecipes from "./recipes/pages/UserRecipes/UserRecipes";
import NewRecipe from "./recipes/pages/NewRecipe/NewRecipe";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = (props) => {
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    setUserId(userId);
  };

  const logout = () => {
    setUserId(null);
  };

  let routes;
  if (userId) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Recipes />
        </Route>
        <Route path="/:userId/recipe">
          <UserRecipes />
        </Route>
        <Route path="/recipe/new">
          <NewRecipe />
        </Route>
      </Switch>
    );
  } else {
    routes = (
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
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!userId,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navigation />
        <main className="main">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
