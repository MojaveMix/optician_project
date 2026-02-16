const express = require("express");
const {
  showAllCustomersController,
  updateCustomersController,
  createCustomersController,
  DeleteCustomersController,
} = require("../controllers/customer.controller");
const authenticate = require("../middleware/authenticate");
const customerRouter = express.Router();

customerRouter.get("/all", authenticate, showAllCustomersController);
customerRouter.put("/update", authenticate, updateCustomersController);
customerRouter.post("/create", authenticate, createCustomersController);
customerRouter.put("/delete", authenticate, DeleteCustomersController);

module.exports = customerRouter;
