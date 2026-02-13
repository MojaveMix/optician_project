const { QuerySql, QuerySqlInsertedId } = require("./query.service");

const showOrder = async (bodies = []) => {
  try {
    const data = await QuerySql("SELECT * FROM  orders", bodies);
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateOrder = async (bodies = []) => {
  try {
    const data = await QuerySqlInsertedId(
      "INSERT INTO  orders ( customer_id	, total_price	, status) VALUES(? ,  ?  ,  ?)",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateOrderItems = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "INSERT INTO  orders (order_id ,	product_id	, quantity ,	price) VALUES(? ,  ?  ,  ? , ?)",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const showOrderItems = async (bodies = []) => {
  try {
    const data = await QuerySql("SELECT * FROM orders", bodies);
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateOrder = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "UPDATE orders SET status = ? where id = ?",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  showOrder,
  CreateOrder,
  updateOrder,
  CreateOrderItems,
  showOrderItems,
};
