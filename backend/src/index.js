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
   GET COLLEGES
   SEARCH + FILTER + SORT + PAGINATION
============================= */
app.get("/colleges", async (req, res) => {
  try {
    let {
      search = "",
      location = "",
      maxFees = "",
      minRating = "",
      minPlacement = "",
      sort = "",
      page = 1,
      limit = 10,
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;

    let query = `
      SELECT *
      FROM colleges
      WHERE 1 = 1
    `;

    const values = [];

    /* Search by college name */
    if (search) {
      values.push(`%${search}%`);
      query += ` AND name ILIKE $${values.length}`;
    }

    /* Filter by location */
    if (location) {
      values.push(`%${location}%`);
      query += ` AND location ILIKE $${values.length}`;
    }

    /* Maximum fees */
    if (maxFees) {
      values.push(Number(maxFees));
      query += ` AND fees <= $${values.length}`;
    }

    /* Minimum rating */
    if (minRating) {
      values.push(Number(minRating));
      query += ` AND rating >= $${values.length}`;
    }

    /* Minimum placement percentage */
    if (minPlacement) {
      values.push(Number(minPlacement));
      query += ` AND placement_percentage >= $${values.length}`;
    }

    /* Sorting */
    if (sort === "fees_asc") {
      query += ` ORDER BY fees ASC`;
    } else if (sort === "fees_desc") {
      query += ` ORDER BY fees DESC`;
    } else if (sort === "rating_desc") {
      query += ` ORDER BY rating DESC`;
    } else if (sort === "placement_desc") {
      query += ` ORDER BY placement_percentage DESC`;
    } else {
      query += ` ORDER BY id ASC`;
    }

    /* Pagination */
    values.push(limit);
    values.push(offset);

    query += `
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `;

    const result = await pool.query(query, values);

    res.json({
      page,
      limit,
      results: result.rows,
    });
  } catch (err) {
    console.error("Error fetching colleges:", err);

    res.status(500).json({
      error: "Error fetching colleges",
    });
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
      return res.status(404).json({
        error: "College not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching college:", err);

    res.status(500).json({
      error: "Error fetching college",
    });
  }
});

/* =============================
   SERVER START
============================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});