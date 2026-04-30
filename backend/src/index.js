const express = require("express");
const cors = require("cors");
const pool = require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());

/* =============================
   ROOT ROUTE
============================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =============================
   TEST DB ROUTE
============================= */
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

/* =============================
   GET COLLEGES (SEARCH + FILTER + PAGINATION)
============================= */
app.get("/colleges", async (req, res) => {
  let { search, location, page, limit } = req.query;

  // Default values
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const offset = (page - 1) * limit;

  try {
    let query = "SELECT * FROM colleges WHERE 1=1";
    let values = [];

    // 🔍 Search by name
    if (search) {
      values.push(`%${search}%`);
      query += ` AND name ILIKE $${values.length}`;
    }

    // 📍 Filter by location
    if (location) {
      values.push(`%${location}%`);
      query += ` AND location ILIKE $${values.length}`;
    }

    // 📄 Pagination
    values.push(limit);
    values.push(offset);

    query += ` ORDER BY id LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    res.json({
      page,
      limit,
      results: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching colleges");
  }
});

/* =============================
   GET SINGLE COLLEGE
============================= */
app.get("/colleges/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM colleges WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("College not found");
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching college");
  }
});

/* =============================
   SERVER START
============================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});