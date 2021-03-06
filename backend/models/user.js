const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  image: { type: String, required: true },
  recipes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Recipe" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
