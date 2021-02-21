const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  recipeId: { type: mongoose.Types.ObjectId, required: true, ref: "Recipe" },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  rating: { type: String, required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);
