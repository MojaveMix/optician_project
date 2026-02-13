const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
});

module.exports = db;
