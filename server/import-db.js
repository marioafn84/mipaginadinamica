import fs from "fs";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

const sql = fs.readFileSync("./tiendainformaticacrud.sql", "utf8");

const queries = sql.split(";").filter(q => q.trim());

for (const query of queries) {
  try {
    await connection.query(query);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

console.log("Base de datos importada ✅");
process.exit();