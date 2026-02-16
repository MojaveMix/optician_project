const bcrypt = require("bcryptjs");
const {
  findUser,
  CreateUser,
  findUserById,
} = require("../services/user.service");
const jwt = require("jsonwebtoken");

const authController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const rows = await findUser(email);
    const user = rows[0];

    if (!user) return res.status(401).send({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        shop_id: user.shop_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const findUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await findUserById(id);

    return res.json(data.length > 0 ? data[0] : {});
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const RegisterController = async (req, res) => {
  try {
    const { full_name, email, password, role, phone } = req.body;
    const rows = await findUser(email);
    const user = rows[0];

    if (user) return res.status(401).send({ error: "User alreay exist" });

    const saltRounds = 12; // 10-12 is recommended
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await CreateUser([full_name, email, hashedPassword, role, phone]);

    return res.json({ success: "user created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

module.exports = { authController, RegisterController, findUserByIdController };
