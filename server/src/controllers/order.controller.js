const {
  showOrder,
  CreateOrder,
  updateOrder,
  CreateOrderItems,
  showOrderItems,
} = require("../services/order.service");
const { QuerySql } = require("../services/query.service");

const showAllOrdersController = async (req, res) => {
  try {
    const data = await showOrder();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const updateOrdersController = async (req, res) => {
  try {
    const { id, status} = req.body;
    
    await updateOrder([status, id]);
    //     await QuerySql(
    //   "UPDATE orders SET status = ? where id = ?",
    //   bodies,
    // );
    return res.json({ success: "customer updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const createOrdersController = async (req, res) => {
  try {
    const { customer_id, total_price, status } = req.body;
    const data = await CreateOrder([customer_id, total_price, status]);
    return res.json({ id: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const createOrdersItemsController = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;
   
    const data = await QuerySql('SELECT * FROM  order_items where order_id = ? and product_id = ?' ,[order_id, product_id])
    if (data.length > 0){
       
      await QuerySql('UPDATE order_items SET quantity = ?  where order_id = ? and product_id = ?' , [quantity , order_id, product_id])

    }else {
      await CreateOrderItems([order_id, product_id, quantity, price]);
    }
    return res.json({ success: "Order item created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

const showOrdersItemsController = async (req, res) => {
  try {
    const data = await showOrderItems();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internale server problem" });
  }
};

module.exports = {
  showAllOrdersController,
  updateOrdersController,
  createOrdersController,
  createOrdersItemsController,
  showOrdersItemsController,
};
