const express = require("express");

const recipesController = require("../controllers/recipes-controllers");

const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/user/:userId", recipesController.getRecipesByUserId);

router.post("/", recipesController.createRecipe);

router.post("/:recipeId", recipesController.updateRecipe);

router.delete("/:recipeId", recipesController.deleteRecipe);

module.exports = router;
