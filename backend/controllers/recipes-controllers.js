const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const getAllRecipes = async (req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
  } catch (error) {
    return next(new HttpError("Fetching recipes failed.", 500));
  }

  return res.status(200).json({
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

const getRecipesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let recipes;
  try {
    recipes = await Recipe.find({ user: userId });
  } catch (error) {
    return next("Fetching recipes failed. Something went wrong !", 500);
  }

  if (!recipes) {
    return next("Could not find recipes for the provided user id", 404);
  }

  return res.json({
    recipes: recipes.map((recipe) => recipe.toObject({ getters: true })),
  });
};

const createRecipe = async (req, res, next) => {
  const {
    title,
    description,
    preparationTime,
    cookingTime,
    servings,
    ingredients,
    steps,
    userId,
  } = req.body;

  let newRecipe = new Recipe({
    title,
    description,
    preparationTime,
    cookingTime,
    servings,
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F848007.jpg&w=596&h=399&c=sc&poi=face&q=85",
    ingredients,
    steps,
    user: userId,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next("Create recipe failed. Something went wrong.", 500);
  }

  if (!user) {
    return next("Could not found user", 404);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newRecipe.save({ session: session });
    user.recipes.push(newRecipe);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return next("Create recipe failed. Something went wrong.", 500);
  }

  return res.json(newRecipe);
};

const updateRecipe = async (req, res, next) => {
  return res.status(200).json({ message: "updateRecipe" });
};

const deleteRecipe = async (req, res, next) => {
  return res.status(200).json({ message: "deleteRecipe" });
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
