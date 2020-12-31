const express = require("express");

const Recipe = require("../models/recipe");

const recipesController = require("../controllers/recipes-controllers");
const fileUpload = require("../middlewares/file-upload");
const checkAuth = require("../middlewares/check-auth");
const pagination = require("../middlewares/pagination");

const router = express.Router();

router.get("/", pagination(Recipe), recipesController.getAllRecipes);

router.get("/:recipeId", recipesController.getRecipeById);

router.get("/user/:userId", recipesController.getRecipesByUserId);

router.use(checkAuth);

router.post("/", fileUpload.single("image"), recipesController.createRecipe);

router.patch("/:recipeId", recipesController.updateRecipe);

router.delete("/:recipeId", recipesController.deleteRecipe);

module.exports = router;
