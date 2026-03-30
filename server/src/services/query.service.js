const { createDb } = require("../config/db");

const QuerySql = async (query, params = []) => {
  const db = await createDb();

  const [rows] = await db.execute(query, params);
  return rows;
};

const QuerySqlInsertedId = async (query, params = []) => {
  const db = await createDb();

  const [result] = await db.execute(query, params);
  return result.insertId;
};

module.exports = { QuerySql, QuerySqlInsertedId };
