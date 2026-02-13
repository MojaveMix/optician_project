const {
  showPrescription,
  CreatePrescription,
} = require("../services/prescription.service");

const showAllPrescriptionController = async (req, res) => {
  try {
    const data = await showPrescription();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const createPrescriptionController = async (req, res) => {
  try {
    const {
      customer_id,
      right_eye_sphere,
      right_eye_cylinder,
      right_eye_axis,
      left_eye_sphere,
      left_eye_cylinder,
      left_eye_axis,
      addition,
      doctor_name,
      prescription_date,
      notes,
    } = req.body;
    await CreatePrescription([
      customer_id,
      right_eye_sphere,
      right_eye_cylinder,
      right_eye_axis,
      left_eye_sphere,
      left_eye_cylinder,
      left_eye_axis,
      addition,
      doctor_name,
      prescription_date,
      notes,
    ]);
    return res.json({ success: "prescription created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

module.exports = {
  createPrescriptionController,
  showAllPrescriptionController,
};
