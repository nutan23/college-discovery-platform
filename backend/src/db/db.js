const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }
);

pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL Connected Successfully");
    client.release();
  })
  .catch((err) => {
    console.error("Database Connection Error:", err.message);
  });

module.exports = pool;