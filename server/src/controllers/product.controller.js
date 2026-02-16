const {
  showAllProducts,
  updateProducts,
  CreateProducts,
  showProductById,
} = require("../services/product.service");
const { QuerySql } = require("../services/query.service");

const ShowAllProductController = async (req, res) => {
  try {
    const data = await showAllProducts();
    res.json(data ? data : []);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};

const ShowProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await showProductById(id);
    res.json(data.length > 0 ? data[0] : {});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};

const UpdateProductController = async (req, res) => {
  try {
    const {
      id,
      name,
      category,
      brand,
      model,
      barcode,
      purchase_price,
      selling_price,
      stock_quantity,
      min_stock,
      description,
    } = req.body;
    if (!id) res.status(401).send("User not found");
    await updateProducts([
      name,
      category,
      brand,
      model,
      barcode,
      purchase_price,
      selling_price,
      stock_quantity,
      min_stock,
      description,
      id,
    ]);
    res.json({ success: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};

const DeleteProductController = async (req, res) => {
  try {
    const { id } = req.body;
    await QuerySql("UPDATE products set casher = -1 where id = ?", [id]);
    res.json({ success: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};

const CreateProductController = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      model,
      barcode,
      purchase_price,
      selling_price,
      stock_quantity,
      min_stock,
      description,
    } = req.body;
    const data = await CreateProducts([
      name,
      category,
      brand,
      model,
      barcode,
      purchase_price,
      selling_price,
      stock_quantity,
      min_stock,
      description,
    ]);
    res.json({ id: data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};
module.exports = {
  ShowAllProductController,
  UpdateProductController,
  CreateProductController,
  ShowProductByIdController,
  DeleteProductController,
};
