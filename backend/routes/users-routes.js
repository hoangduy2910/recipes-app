const express = require("express");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/:userId", usersController.getUserByUserId);

router.post("/login", usersController.login);

router.post("/register", usersController.register);

module.exports = router;
