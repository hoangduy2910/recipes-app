const { error } = require("console");
const fs = require("fs");

const mongoose = require("mongoose");
const sharp = require("sharp");

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

const getRecipeById = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  let recipe;
  try {
    recipe = await Recipe.findById(recipeId);
  } catch (error) {
    return next(new HttpError("Fetching recipe failed.", 500));
  }

  return res.json({ recipe: recipe.toObject({ getters: true }) });
};

const getRecipesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let recipes;
  try {
    recipes = await Recipe.find({ user: userId });
  } catch (error) {
    return next(
      new HttpError("Fetching recipes failed. Something went wrong !", 500)
    );
  }

  if (!recipes) {
    return next(
      new HttpError("Could not find recipes for the provided user id", 404)
    );
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

  try {
    await sharp(req.file.path)
      .resize(325, 240)
      .toFile(
        `${req.file.destination}/582x388-${req.file.filename}`,
        (error) => {
          if (error) {
            return next(
              new HttpError("Create recipe failed. Something went wrong.", 500)
            );
          }

          fs.unlink(req.file.path, (error) => {});
        }
      );
  } catch (error) {
    return next(
      new HttpError("Create recipe failed. Something went wrong.", 500)
    );
  }

  let ingsParse = JSON.parse(ingredients);
  let stepsParse = JSON.parse(steps);

  let newRecipe = new Recipe({
    title,
    description,
    preparationTime,
    cookingTime,
    servings,
    image: `${req.file.destination}/582x388-${req.file.filename}`,
    ingredients: ingsParse,
    steps: stepsParse,
    user: userId,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Create recipe failed. Something went wrong.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not found user", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newRecipe.save({ session: session });
    user.recipes.push(newRecipe);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Create recipe failed. Something went wrong.", 500)
    );
  }

  return res.json(newRecipe);
};

const updateRecipe = async (req, res, next) => {
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

  const recipeId = req.params.recipeId;

  let updatedRecipe;
  try {
    updatedRecipe = await Recipe.findById(recipeId);
  } catch (error) {
    return next(
      new HttpError("Update recipe failed. Something went wrong.", 500)
    );
  }

  if (updatedRecipe.user.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed edit this recipe.", 401));
  }

  updatedRecipe.title = title;
  updatedRecipe.description = description;
  updatedRecipe.preparationTime = preparationTime;
  updatedRecipe.cookingTime = cookingTime;
  updatedRecipe.servings = servings;
  updatedRecipe.ingredients = ingredients;
  updatedRecipe.steps = steps;
  updatedRecipe.userId = userId;

  try {
    await updatedRecipe.save();
  } catch (error) {
    return next(
      new HttpError("Update recipe failed. Something went wrong.", 500)
    );
  }

  return res.json({ recipe: updatedRecipe.toObject({ getters: true }) });
};

const deleteRecipe = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  let deletedRecipe;
  try {
    deletedRecipe = await Recipe.findById(recipeId).populate("user");
  } catch (error) {
    return next(
      new HttpError("Delete recipe failed. Something went wrong.", 500)
    );
  }

  if (!deletedRecipe) {
    return next(new HttpError("Could not find recipe.", 404));
  }

  if (deletedRecipe.user.id.toString() !== req.userData.userId) {
    return next(new HttpError("You are not allowed delete this recipe.", 401));
  }

  const imagePath = deletedRecipe.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await deletedRecipe.remove({ session: session });
    deletedRecipe.user.recipes.pull(deletedRecipe);
    await deletedRecipe.user.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Delete recipe failed. Something went wrong.", 500)
    );
  }

  fs.unlink(imagePath, (error) => {});

  return res.json({ status: 200, message: "Delete recipe success." });
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipeById = getRecipeById;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
