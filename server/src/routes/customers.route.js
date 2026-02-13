const express = require("express");
const {
  showAllCustomersController,
  updateCustomersController,
  createCustomersController,
} = require("../controllers/customer.controller");
const customerRouter = express.Router();

customerRouter.get("/all", showAllCustomersController);
customerRouter.put("/update", updateCustomersController);
customerRouter.post("/create", createCustomersController);

module.exports = customerRouter;
