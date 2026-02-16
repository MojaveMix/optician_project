const express = require("express");
const {
  ShowAllPaymentController,
  CreatePaymentController,
} = require("../controllers/payment.controller");
const authenticate = require("../middleware/authenticate");

const paymentRouter = express.Router();

paymentRouter.get("/all", authenticate, ShowAllPaymentController);
paymentRouter.post("/create", authenticate, CreatePaymentController);

module.exports = paymentRouter;
