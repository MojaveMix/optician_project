const express = require("express");
const AppRouter = express.Router();
AppRouter.use("/auth", require("./auth.routes"));
AppRouter.use("/products", require("./product.routes"));
AppRouter.use("/customers", require("./customers.route"));
AppRouter.use("/prescriptions", require("./prescription.route"));
AppRouter.use("/orders", require("./order.routes"));
module.exports = AppRouter;
