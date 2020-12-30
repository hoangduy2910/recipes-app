const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  console.log(email, password);

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

  let token;
  try {
    token = jwt.sign(
      {
        userId: existedUser.id,
      },
      "super_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Login failed. Please try again.", 500));
  }

  return res.json({ userId: existedUser.id, token: token });
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
    recipes: [],
  });
  try {
    await newUser.save();
  } catch (error) {
    return next(new HttpError("Register failed. Something went wrong.", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
      },
      "super_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(new HttpError("Register failed. Please try again.", 500));
  }

  return res.json({ userId: newUser.id, token: token });
};

exports.getUserByUserId = getUserByUserId;
exports.login = login;
exports.register = register;
