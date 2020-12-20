const bcrypt = require("bcrypt");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUserByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Fetching user failed. Something went wrong.", 500)
    );
  }

  return res.json({ user: user.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login failed. Something went wrong.", 500));
  }

  if (!existedUser) {
    return next(new HttpError("Login failed. User does not exist.", 401));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existedUser.password);
  } catch (error) {
    return next(new HttpError("Login failed. Something went wrong.", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Login failed. Wrong password.", 401));
  }

  return res.json({ userId: existedUser.id });
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existedUser;
  try {
    existedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Register failed. Something went wrong.", 500));
  }

  if (existedUser) {
    return next(new HttpError("Register failed. Email already exists.", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Register failed. Something went wrong.", 500));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    image: "/uploads/images/user-image-default.png",
    recipes: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Register failed. Something went wrong.", 500));
  }

  return res.json({ user: newUser.toObject({ getters: true }) });
};

exports.getUserByUserId = getUserByUserId;
exports.login = login;
exports.register = register;
