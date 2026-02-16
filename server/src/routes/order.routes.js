const express = require("express");
const {
  showAllOrdersController,
  createOrdersController,
  updateOrdersController,
  showOrdersItemsController,
  createOrdersItemsController,
  DeleteOrderController,
} = require("../controllers/order.controller");
const authenticate = require("../middleware/authenticate");
const orderRouter = express.Router();

orderRouter.get("/all", authenticate, showAllOrdersController);
orderRouter.get("/items/all", authenticate, showOrdersItemsController);
orderRouter.post("/create", authenticate, createOrdersController);
orderRouter.post("/items/create", authenticate, createOrdersItemsController);
orderRouter.put("/update", authenticate, updateOrdersController);
orderRouter.put("/delete", authenticate, DeleteOrderController);

module.exports = orderRouter;
