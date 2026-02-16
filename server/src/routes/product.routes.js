const express = require("express");
const {
  ShowAllProductController,
  UpdateProductController,
  CreateProductController,
  ShowProductByIdController,
  DeleteProductController,
} = require("../controllers/product.controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { QuerySql } = require("../services/query.service");
const authenticate = require("../middleware/authenticate");
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
const ProductRouter = express.Router();

ProductRouter.get("/all", ShowAllProductController);
ProductRouter.get("/show/:id", ShowProductByIdController);
ProductRouter.put("/update", authenticate, UpdateProductController);
ProductRouter.post("/create", authenticate, CreateProductController);
ProductRouter.put("/delete", authenticate, DeleteProductController);
ProductRouter.use(
  "/uploads",
  authenticate,
  express.static(path.join(__dirname, "uploads")),
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// File filter to accept images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|jfif|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: Only images are allowed!");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB
  fileFilter: fileFilter,
});

ProductRouter.post(
  "/upload",
  upload.single("image"),
  authenticate,
  async (req, res) => {
    try {
      const { id } = req.body;

      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      // Use the file path relative to 'uploads' folder
      const filePath = `/${req.file.filename}`;
      console.log(req.file.filename);
      // Update DB with the file path
      await QuerySql("UPDATE products SET img_path = ? WHERE id = ?", [
        filePath,
        id,
      ]);

      res.json({
        message: "Image uploaded successfully!",
        file: filePath,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server problem" });
    }
  },
);

ProductRouter.get("/img/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch img_path from the database using product id
    const results = await QuerySql(
      "SELECT img_path FROM products WHERE id = ?",
      [id],
    );
    if (results.length === 0 || !results[0].img_path) {
      return res.status(404).send("Image not found");
    }

    // Construct full path to the file
    const imgPath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      results[0].img_path,
    );

    if (!fs.existsSync(imgPath)) {
      return res.status(404).send("File does not exist");
    }

    // Send the image
    res.sendFile(imgPath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = ProductRouter;
