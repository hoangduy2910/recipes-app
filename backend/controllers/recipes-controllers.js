const HttpError = require("../models/http-error");
const Recipe = require("../models/recipe");

const getAllRecipes = async (req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
  } catch (error) {
    return next(new HttpError("Fetching recipe failed.", 500));
  }

  return res.status(200).json({
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

const getRecipesByUserId = (req, res, next) => {
  return res.status(200).json({ message: "getRecipesByUserId" });
};

const createRecipe = (req, res, next) => {
  return res.status(200).json({ message: "createRecipe" });
};

const updateRecipe = (req, res, next) => {
  return res.status(200).json({ message: "updateRecipe" });
};

const deleteRecipe = (req, res, next) => {
  return res.status(200).json({ message: "deleteRecipe" });
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
