const mysql = require("mysql2");
require("dotenv").config();

const is_prod = process.env.NODE_ENV == "production";

// create connection to our mysql data base
const connection = mysql.createConnection({
    host: process.env.DB_HOST_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.mysql_first_day_db
  });

module.exports = connection.promise();