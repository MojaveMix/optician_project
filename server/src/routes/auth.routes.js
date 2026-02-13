const express = require("express");
const authRouter = express.Router();
const {
  RegisterController,
  authController,
} = require("../controllers/auth.controller");

authRouter.post("/login", authController);
authRouter.post("/register", RegisterController);

module.exports = authRouter;
