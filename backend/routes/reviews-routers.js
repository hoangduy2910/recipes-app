const express = require("express");

const reviewControllers = require("../controllers/reviews-controllers");

const router = express.Router();

router.get("/:recipeId", reviewControllers.getReviewsByRecipeId);

router.post("/:recipeId", reviewControllers.createReview);

module.exports = router;
