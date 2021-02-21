const mongoose = require("mongoose");

const HttpError = require("../models/http-error");

const Review = require("../models/review");
const Recipe = require("../models/recipe");

const getReviewsByRecipeId = async (req, res, next) => {
  let recipeId = req.params.recipeId;

  let reviews;
  try {
    reviews = await Review.find({ recipeId: recipeId });
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  return res.json({
    reviews: reviews.map((review) => review.toObject({ getters: true })),
  });
};

const createReview = async (req, res, next) => {
  const { recipeId, userId, rating, date, content } = req.body;

  let newReview;
  try {
    newReview = new Review({
      recipeId,
      userId,
      rating,
      date,
      content,
    });
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  let recipe;
  try {
    recipe = Recipe.findById(recipeId);
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  if (!recipe) {
    return next(new HttpError("Could not find recipe.", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newReview.save({ session: session });
    recipe.reviews.push(newReview);
    await recipe.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }

  return res.json({ review: newReview.toObject({ getters: true }) });
};

exports.getReviewsByRecipeId = getReviewsByRecipeId;
exports.createReview = createReview;
