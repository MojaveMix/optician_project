const {
  showAllProducts,
  updateProducts,
  CreateProducts,
} = require("../services/product.service");

const ShowAllProductController = async (req, res) => {
  try {
    const data = await showAllProducts();
    res.json(data ? data : []);
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
      min_stock
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
      id,
    ]);
    res.json({ success: "Product updated successfully" });
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
      min_stock
    } = req.body;
  const data =  await CreateProducts([
      name,
      category,
      brand,
      model,
      barcode,
      purchase_price,
      selling_price,
      stock_quantity,
      min_stock
    ]);
    res.json({id : data});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};
module.exports = {
  ShowAllProductController,
  UpdateProductController,
  CreateProductController,
};
