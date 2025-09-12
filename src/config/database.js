const mysql = require("mysql2");
const SUPER_SECRET_PASSWORD = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  host: "mysql-stayloop-hotels-db-stayloop-hotels.i.aivencloud.com", 
  user: "avnadmin",
  password: SUPER_SECRET_PASSWORD, 
  database: "stayloop_hotels", 
});

module.exports = pool.promise();
