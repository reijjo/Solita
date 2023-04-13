const journeyRouter = require('express').Router()
const { pool } = require('../utils/dbConnection')

journeyRouter.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM journey_data ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
      // `SELECT * FROM journey_data WHERE departure_station_id = $1 AND return_station_id = $2 AND duration_sec < 400 ORDER BY departure_time LIMIT $3 OFFSET $4`,
      // [94, 100, Number(limit), Number(offset)]
    );
    res.json(result.rows);
    //res.send(result)
  } catch (error) {
    console.error("Error fetching journeys:", error);
  }
});

journeyRouter.get("/may", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM may_journey_data ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching May journeys:", error);
  }
});

journeyRouter.get("/june", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM june_journey_data ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching June journeys:", error);
  }
});

journeyRouter.get("/july", async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM july_journey_data ORDER BY id LIMIT $1 OFFSET $2`,
      [Number(limit), Number(offset)]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching July journeys:", error);
  }
});

module.exports = journeyRouter
