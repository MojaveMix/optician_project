const express = require("express");
const {
  ShowAllProductController,
  UpdateProductController,
  CreateProductController,
} = require("../controllers/product.controller");
const ProductRouter = express.Router();

ProductRouter.get("/all", ShowAllProductController);
ProductRouter.put("/update", UpdateProductController);
ProductRouter.post("/create", CreateProductController);

module.exports = ProductRouter;
