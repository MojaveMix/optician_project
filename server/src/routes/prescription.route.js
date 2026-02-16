const express = require("express");
const {
  createPrescriptionController,
  showAllPrescriptionController,
  DeletePrescriptionController,
} = require("../controllers/prescription.controller");
const authenticate = require("../middleware/authenticate");
const prescriptionRouter = express.Router();

prescriptionRouter.get("/all", authenticate, showAllPrescriptionController);
prescriptionRouter.post("/create", authenticate, createPrescriptionController);
prescriptionRouter.put("/delete", authenticate, DeletePrescriptionController);

module.exports = prescriptionRouter;
