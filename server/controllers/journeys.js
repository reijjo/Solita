const journeyRouter = require('express').Router()
const { pool } = require('../utils/dbConnection')

journeyRouter.get('/', async (req, res) => {
	try {
    const result = await pool.query(
      //`SELECT * FROM journey_data WHERE duration_sec < 60`
      `SELECT * FROM journey_data WHERE departure_station_id = $1 AND return_station_id = $2 AND duration_sec < 400`,
      //`SELECT * FROM journey_data WHERE departure_station_id = $1 AND return_station_id = $2 AND duration_sec < 400`,
       [94, 100]
    );
    res.json(result.rows);
    //res.send(result)
  }
	catch (error) {
		console.error('Error fetching journeys:', error)
	}
})

module.exports = journeyRouter
