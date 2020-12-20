const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {type: String, required: true},
  ingredients: [{ type: String, required: true }],
  steps: [{ type: String, required: true }],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Recipe", recipeSchema);
