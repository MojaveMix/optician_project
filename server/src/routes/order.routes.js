const express = require("express");
const {
  showAllOrdersController,
  createOrdersController,
  updateOrdersController,
  showOrdersItemsController,
  createOrdersItemsController,
} = require("../controllers/order.controller");
const orderRouter = express.Router();

orderRouter.get("/all", showAllOrdersController);
orderRouter.get("/items/all", showOrdersItemsController);
orderRouter.post("/create", createOrdersController);
orderRouter.post("/items/create", createOrdersItemsController);
orderRouter.put("/update", updateOrdersController);

module.exports = orderRouter;
