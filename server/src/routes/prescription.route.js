const express = require("express");
const {
  createPrescriptionController,
  showAllPrescriptionController,
} = require("../controllers/prescription.controller");
const prescriptionRouter = express.Router();

prescriptionRouter.get("/all", showAllPrescriptionController);
prescriptionRouter.post("/create", createPrescriptionController);

module.exports = prescriptionRouter;
