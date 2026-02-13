const {
  showCustomers,
  updateCustomer,
  CreateCustomer,
} = require("../services/customers.service");

const showAllCustomersController = async (req, res) => {
  try {
    const data = await showCustomers();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
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
};
