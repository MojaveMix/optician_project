require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json()); // regular JSON parsing
app.use("/api", require("./src/routes"));
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
