const express = require("express");
const { findUserByIdController } = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");
const userRouter = express.Router();

userRouter.get("/:id", authenticate, findUserByIdController);

module.exports = userRouter;
