const { QuerySql } = require("./query.service");

const showPrescription = async (bodies = []) => {
  try {
    const data = await QuerySql("SELECT * FROM prescriptions", bodies);
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreatePrescription = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "INSERT INTO prescriptions (customer_id , right_eye_sphere , right_eye_cylinder ,	right_eye_axis , left_eye_sphere , left_eye_cylinder , left_eye_axis , addition ,	doctor_name ,	prescription_date	, notes) VALUES(?, ? , ? , ? ,? , ?,? ,? ,?,?,?)",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { showPrescription, CreatePrescription };
