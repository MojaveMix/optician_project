const { QuerySql } = require("./query.service");

const showCustomers = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "SELECT * FROM customers where casher > 0",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateCustomer = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "INSERT INTO customers (full_name , 	phone ,	email	,address	,birth_date ,	notes) VALUES(?, ? , ? , ? ,? , ?)",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateCustomer = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "UPDATE customers SET full_name  = ? , 	phone = ? ,	email = ?	,address =?	, birth_date = ? ,	notes = ? where id = ?",
      bodies,
    );
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { CreateCustomer, updateCustomer, showCustomers };
