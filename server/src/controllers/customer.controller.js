const {
  showCustomers,
  updateCustomer,
  CreateCustomer,
} = require("../services/customers.service");
const { QuerySql } = require("../services/query.service");

const showAllCustomersController = async (req, res) => {
  try {
    const data = await showCustomers();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const DeleteCustomersController = async (req, res) => {
  try {
    const { id } = req.body;
    await QuerySql("UPDATE customers set casher = -1 where id = ?", [id]);
    res.json({ success: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};

const updateCustomersController = async (req, res) => {
  try {
    const { id, full_name, phone, email, address, birth_date, notes } =
      req.body;
    await updateCustomer([
      full_name,
      phone,
      email,
      address,
      birth_date,
      notes,
      id,
    ]);
    return res.json({ success: "customer updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const createCustomersController = async (req, res) => {
  try {
    const { full_name, phone, email, address, birth_date, notes } = req.body;
    await CreateCustomer([full_name, phone, email, address, birth_date, notes]);
    return res.json({ success: "customer updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

module.exports = {
  showAllCustomersController,
  updateCustomersController,
  createCustomersController,
  DeleteCustomersController,
};
