const mysql = require("mysql2/promise");
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DB,
//   password: process.env.MYSQL_PASSWORD,
//   host: process.env.MYSQL_HOST,
// });

// module.exports = db;
async function createDb() {
  return await mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "optician",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
  });
}
module.exports = { createDb };
