const db = require("../config/db");

const QuerySql = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const QuerySqlInsertedId = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.insertId);
      }
    });
  });
};

module.exports = { QuerySql, QuerySqlInsertedId };
