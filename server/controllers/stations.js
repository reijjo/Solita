const stationRouter = require("express").Router();
const { pool } = require("../utils/dbConnection");

stationRouter.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM bike_stations ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching stations:", error);
  }
});

module.exports = stationRouter;
