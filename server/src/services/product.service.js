const { QuerySql, QuerySqlInsertedId } = require("./query.service");

const showAllProducts = async () => {
  try {
    const data = await QuerySql("SELECT * FROM products where casher > 0");

    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const showProductById = async (params = []) => {
  try {
    const data = await QuerySql("SELECT * FROM products where id = ?", params);

    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateProducts = async (params = []) => {
  try {
    const data = await QuerySql(
      "update products set name = ? , category = ? , brand = ? , model = ? , barcode=? , purchase_price= ? , selling_price= ? , stock_quantity = ? , min_stock = ? , description = ? where id = ?",
      params,
    );
    console.log(params);
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateProducts = async (params = []) => {
  try {
    const data = await QuerySqlInsertedId(
      "INSERT INTO products (name, category, brand, model, barcode, purchase_price, selling_price, stock_quantity , min_stock , description) VALUES(?, ?, ?, ?, ?, ?, ?, ? , ? , ?)",
      params,
    );

    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  showAllProducts,
  updateProducts,
  CreateProducts,
  showProductById,
};
