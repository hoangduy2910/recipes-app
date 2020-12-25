const express = require("express");

const recipesController = require("../controllers/recipes-controllers");
const fileUpload = require("../middlewares/file-upload");

const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/:recipeId", recipesController.getRecipeById);

router.get("/user/:userId", recipesController.getRecipesByUserId);

router.post("/", fileUpload.single("image"), recipesController.createRecipe);

router.post("/:recipeId", recipesController.updateRecipe);

router.delete("/:recipeId", recipesController.deleteRecipe);

module.exports = router;
