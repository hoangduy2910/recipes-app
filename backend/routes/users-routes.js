const express = require("express");

const usersController = require("../controllers/users-controllers");

const fileUpload = require("../middlewares/file-upload");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.get("/:userId", usersController.getUserByUserId);

router.post("/login", usersController.login);

router.post("/register", usersController.register);

router.use(checkAuth);

router.post("/:userId", fileUpload.single("image"), usersController.updateUser);

module.exports = router;
