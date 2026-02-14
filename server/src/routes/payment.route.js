const express = require("express");
const { ShowAllPaymentController, CreatePaymentController } = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.get("/all", ShowAllPaymentController);
paymentRouter.post("/create", CreatePaymentController);

module.exports = paymentRouter;
