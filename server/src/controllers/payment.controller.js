const { showPayment, createPayment } = require("../services/payment.service");

const ShowAllPaymentController = async (req, res) => {
  try {
    const data = await showPayment();
    res.json(data ? data : []);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};



const CreatePaymentController = async (req, res) => {
  try {
    const {order_id ,	amount ,	payment_method} = req.body ;
     await createPayment([order_id ,	amount ,	payment_method]);
    res.json({success : "Payment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internale server problem" });
  }
};



module.exports = {ShowAllPaymentController , CreatePaymentController}