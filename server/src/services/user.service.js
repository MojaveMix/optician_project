const { QuerySql } = require("./query.service");

const findUser = async (email) => {
  try {
    const data = await QuerySql("SELECT * FROM users where email = ?", [email]);

    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CreateUser = async (bodies = []) => {
  try {
    const data = await QuerySql(
      "INSERT INTO users (full_name , 	email,	password , role, phone ) VALUES(? , ? , ? ,? , ?)",
      bodies,
    );
    console.log("data", data);
    return data ? data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { findUser, CreateUser };
