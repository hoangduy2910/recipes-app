import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navigation from "./shared/components/Navigation/Navigation";
import Login from "./users/pages/Login/Login";
import Register from "./users/pages/Register/Register";
import Recipes from "./recipes/pages/Recipes/Recipes";
import UserRecipes from "./recipes/pages/UserRecipes/UserRecipes";
import NewRecipe from "./recipes/pages/NewRecipe/NewRecipe";
import RecipeDetail from "./recipes/pages/RecipeDetail/RecipeDetail";
import Profile from "./users/pages/Profile/Profile";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = (props) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((userId, token, expiration) => {
    setUserId(userId);
    setToken(token);

    const tokenExpirationDate =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  let routes;
  if (userId) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Recipes />
        </Route>
        <Route path="/recipe/new">
          <NewRecipe />
        </Route>
        <Route path="/:userId/recipes">
          <UserRecipes />
        </Route>
        <Route path="/recipe/:recipeId">
          <RecipeDetail />
        </Route>
        <Route path="/profile/:userId">
          <Profile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Recipes />
        </Route>
        <Route path="/recipe/:recipeId">
          <RecipeDetail />
        </Route>
        <Route path="/:userId/recipes">
          <UserRecipes />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!token,
        userId: userId,
        token: token,
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
